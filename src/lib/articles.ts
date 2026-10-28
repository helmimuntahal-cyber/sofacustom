import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { parseMarkdown, type Block } from "@/lib/markdown";
import type { ArticleMeta } from "@/lib/article-types";

/**
 * Pembaca artikel (hanya dijalankan saat build / di server).
 * Artikel = file Markdown di content/articles/*.md dengan frontmatter di atas.
 * Panduan menulis: docs/PENGELOLAAN-ARTIKEL.md
 */

export interface Article extends ArticleMeta {
  blocks: Block[];
  headings: { level: 2 | 3; id: string; text: string }[];
}

const CONTENT_DIR = path.join(process.cwd(), "content", "articles");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const WORDS_PER_MINUTE = 200;

function parseFrontmatter(raw: string, file: string): { data: Record<string, string>; body: string } {
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(raw.replace(/\r\n?/g, "\n").replace(/^﻿/, ""));
  if (!m) throw new Error(`${file}: frontmatter (blok --- ... ---) tidak ditemukan di awal file.`);
  const data: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const idx = line.indexOf(":");
    if (idx < 1) throw new Error(`${file}: baris frontmatter tidak valid: "${line}"`);
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (/^(".*"|'.*')$/.test(value)) value = value.slice(1, -1);
    data[key] = value;
  }
  return { data, body: m[2] };
}

function isRealDate(iso: string): boolean {
  if (!ISO_DATE.test(iso)) return false;
  const d = new Date(`${iso}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().startsWith(iso);
}

function assertLocalImage(src: string, where: string) {
  if (!src.startsWith("/images/") || src.includes("..")) {
    throw new Error(`${where}: gambar harus berupa path lokal yang diawali "/images/" (bukan URL luar): "${src}"`);
  }
  if (!existsSync(path.join(PUBLIC_DIR, src))) {
    throw new Error(`${where}: file gambar tidak ditemukan di public${src}`);
  }
}

function readArticle(file: string): { article: Article; draft: boolean } {
  const { data, body } = parseFrontmatter(readFileSync(path.join(CONTENT_DIR, file), "utf8"), file);

  for (const key of ["title", "slug", "description", "publishedAt", "category", "author"]) {
    if (!data[key]) throw new Error(`${file}: field frontmatter "${key}" wajib diisi.`);
  }
  if (!SLUG_PATTERN.test(data.slug)) {
    throw new Error(`${file}: slug "${data.slug}" tidak valid (huruf kecil, angka, dan tanda hubung saja).`);
  }
  if (!isRealDate(data.publishedAt)) throw new Error(`${file}: publishedAt harus tanggal ISO nyata (YYYY-MM-DD), bukan "${data.publishedAt}".`);
  if (data.updatedAt && !isRealDate(data.updatedAt)) throw new Error(`${file}: updatedAt harus tanggal ISO nyata (YYYY-MM-DD).`);
  if (data.description.length > 200) throw new Error(`${file}: description ${data.description.length} karakter; maksimal 200.`);
  if (data.coverFit && !["cover", "contain"].includes(data.coverFit)) {
    throw new Error(`${file}: coverFit harus "cover" atau "contain", bukan "${data.coverFit}".`);
  }
  if (data.coverImage) {
    assertLocalImage(data.coverImage, `${file} (coverImage)`);
    if (!data.coverImageAlt) throw new Error(`${file}: coverImageAlt wajib diisi bila coverImage dipakai.`);
  }
  const parsed = parseMarkdown(body);
  for (const block of parsed.blocks) {
    if (block.type === "image") assertLocalImage(block.src, `${file} (gambar di isi artikel)`);
  }
  if (parsed.blocks.length === 0) throw new Error(`${file}: isi artikel kosong.`);

  const article: Article = {
    slug: data.slug,
    title: data.title,
    description: data.description,
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt || undefined,
    category: data.category,
    coverImage: data.coverImage || undefined,
    coverImageAlt: data.coverImageAlt || undefined,
    coverFit: data.coverFit === "contain" ? "contain" : "cover",
    author: data.author,
    featured: data.featured === "true",
    readingMinutes: Math.max(1, Math.round(parsed.wordCount / WORDS_PER_MINUTE)),
    blocks: parsed.blocks,
    headings: parsed.headings,
  };
  // draft: true = disimpan di repo tetapi belum diterbitkan.
  return { article, draft: data.draft === "true" };
}

let cache: Article[] | null = null;

/** Semua artikel yang diterbitkan, terbaru lebih dulu (tanggal sama: urut nama file). Gagal jika ada data tidak valid. */
export function getAllArticles(): Article[] {
  if (cache) return cache;
  const files = readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .sort();

  const articles: Article[] = [];
  const seen = new Map<string, string>();
  for (const file of files) {
    const { article, draft } = readArticle(file);
    if (draft) continue;
    const dup = seen.get(article.slug);
    if (dup) throw new Error(`Slug "${article.slug}" dipakai ganda di ${dup} dan ${file}.`);
    seen.set(article.slug, file);
    articles.push(article);
  }
  // sort() stabil: urutan nama file dipertahankan untuk tanggal yang sama.
  articles.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  cache = articles;
  return articles;
}

export function getArticle(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

/** Ringkasan tanpa isi artikel, aman dikirim ke komponen client. */
export function toMeta(article: Article): ArticleMeta {
  const { blocks: _blocks, headings: _headings, ...meta } = article;
  void _blocks;
  void _headings;
  return meta;
}

/** Artikel terkait: kategori yang sama lebih dulu, lalu artikel terbaru lainnya. */
export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const others = getAllArticles().filter((a) => a.slug !== article.slug);
  const same = others.filter((a) => a.category === article.category);
  const rest = others.filter((a) => a.category !== article.category);
  return [...same, ...rest].slice(0, limit);
}
