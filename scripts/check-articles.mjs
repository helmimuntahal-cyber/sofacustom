// Memeriksa hasil build artikel di folder out/ (jalankan SETELAH `npm run build`):
//   - tiap artikel punya halaman, 1 H1, title & description unik, canonical benar
//   - JSON-LD BlogPosting valid, gambar punya alt, OG & sitemap memuat artikel
//   - semua tautan internal (di halaman artikel dan daftar) menuju file yang ada
// Jalankan: npm run check:articles
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const out = join(root, "out");
const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sofacustom.my.id").replace(/\/$/, "");

if (!existsSync(out)) {
  console.error("Folder out/ tidak ada. Jalankan `npm run build` dulu.");
  process.exit(1);
}

const problems = [];
const fail = (msg) => problems.push(msg);

const slugs = readdirSync(join(root, "content", "articles"))
  .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
  .map((f) => {
    const fm = readFileSync(join(root, "content", "articles", f), "utf8").replace(/\r\n/g, "\n");
    const get = (k) => new RegExp(`^${k}:\\s*(.+)$`, "m").exec(fm)?.[1].trim().replace(/^["']|["']$/g, "");
    return { file: f, slug: get("slug"), draft: get("draft") === "true" };
  })
  .filter((a) => !a.draft)
  .map((a) => a.slug);

const sitemap = readFileSync(join(out, "sitemap.xml"), "utf8");
const robots = readFileSync(join(out, "robots.txt"), "utf8");
if (/^Disallow:\s*\/\s*$/m.test(robots) || /Disallow:\s*\/artikel/.test(robots)) fail("robots.txt memblokir halaman artikel");

const titles = new Map();
const descriptions = new Map();
const pages = [{ path: "/artikel/", expectJsonLd: false }, ...slugs.map((s) => ({ path: `/artikel/${s}/`, expectJsonLd: true }))];

for (const { path, expectJsonLd } of pages) {
  const file = join(out, path, "index.html");
  if (!existsSync(file)) {
    fail(`${path}: halaman tidak ada di out/`);
    continue;
  }
  const html = readFileSync(file, "utf8");
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) fail(`${path}: ada ${h1} elemen H1 (seharusnya 1)`);

  const title = /<title>([^<]+)<\/title>/.exec(html)?.[1];
  const desc = /<meta name="description" content="([^"]*)"/.exec(html)?.[1];
  if (!title) fail(`${path}: <title> tidak ada`);
  if (!desc) fail(`${path}: meta description tidak ada`);
  if (title && titles.has(title)) fail(`${path}: title sama dengan ${titles.get(title)}`);
  if (desc && descriptions.has(desc)) fail(`${path}: description sama dengan ${descriptions.get(desc)}`);
  titles.set(title, path);
  descriptions.set(desc, path);

  const canonical = /<link rel="canonical" href="([^"]+)"/.exec(html)?.[1];
  if (canonical !== `${SITE}${path}`) fail(`${path}: canonical "${canonical}" ≠ "${SITE}${path}"`);
  if (!html.includes(`property="og:url" content="${SITE}${path}"`)) fail(`${path}: og:url tidak sesuai`);
  if (!sitemap.includes(`<loc>${SITE}${path}</loc>`)) fail(`${path}: tidak ada di sitemap.xml`);
  if (html.includes("hostingersite.com")) fail(`${path}: masih memuat gambar dari server WordPress lama`);

  for (const tag of html.match(/<img\b[^>]*>/g) ?? []) {
    if (!/\balt="/.test(tag)) fail(`${path}: <img> tanpa alt: ${tag.slice(0, 80)}`);
  }

  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => {
    try {
      return JSON.parse(m[1]);
    } catch {
      fail(`${path}: JSON-LD bukan JSON valid`);
      return null;
    }
  });
  const flat = blocks.flat().filter(Boolean);
  if (expectJsonLd) {
    const post = flat.find((b) => b["@type"] === "BlogPosting");
    if (!post) fail(`${path}: JSON-LD BlogPosting tidak ada`);
    else {
      for (const k of ["headline", "description", "datePublished", "dateModified", "author", "publisher", "mainEntityOfPage"]) {
        if (!post[k]) fail(`${path}: BlogPosting tanpa "${k}"`);
      }
      if (post.url !== `${SITE}${path}`) fail(`${path}: BlogPosting.url salah`);
    }
  }
  if (!flat.some((b) => b["@type"] === "BreadcrumbList")) fail(`${path}: BreadcrumbList tidak ada`);

  // Urutan heading tidak boleh melompat (mis. H1 → H3).
  let prev = 0;
  for (const m of html.matchAll(/<h([1-6])[\s>]/g)) {
    const level = Number(m[1]);
    if (prev && level > prev + 1) fail(`${path}: heading melompat dari H${prev} ke H${level}`);
    prev = level;
  }

  for (const m of html.matchAll(/<a\b[^>]*\bhref="(\/[^"#]*)(#[^"]*)?"/g)) {
    const href = m[1];
    if (href.startsWith("//") || href.startsWith("/_next/")) continue;
    const target = join(out, href);
    if (!(existsSync(join(target, "index.html")) || (existsSync(target) && /\.[a-z0-9]+$/.test(href)))) {
      fail(`${path}: tautan rusak → ${href}`);
    }
  }
  // Anchor daftar isi harus punya id tujuan.
  for (const m of html.matchAll(/<a\b[^>]*\bhref="#([^"]+)"/g)) {
    if (m[1] !== "konten" && !html.includes(`id="${m[1]}"`)) fail(`${path}: anchor #${m[1]} tidak punya tujuan`);
  }
}

if (!existsSync(join(out, "404.html"))) fail("404.html tidak ada di out/");
const extra = (sitemap.match(/<loc>[^<]*\/artikel\/[^<]+<\/loc>/g) ?? []).map((l) => l.replace(/<\/?loc>/g, "").replace(SITE, ""));
for (const p of extra) {
  if (p !== "/artikel/" && !pages.some((x) => x.path === p)) fail(`sitemap memuat URL yang bukan artikel terbit: ${p}`);
}

console.log(`${pages.length} halaman artikel diperiksa (1 daftar + ${slugs.length} detail).`);
if (problems.length) {
  console.log(`\n${problems.length} masalah:`);
  for (const p of problems) console.log(` - ${p}`);
  process.exit(1);
}
console.log("Semua pemeriksaan lulus.");
