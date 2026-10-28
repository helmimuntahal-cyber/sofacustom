/**
 * Parser Markdown sederhana khusus artikel Sofa Custom (tanpa dependency).
 *
 * Yang didukung:
 *  - Judul `##` (H2) dan `###` (H3). `#` (H1) dilarang: H1 dibuat dari `title`.
 *  - Paragraf, daftar `-` / `*`, daftar bernomor `1.`, tabel `| a | b |`,
 *    kutipan `> ` (tampil sebagai kotak tips), gambar `![alt](/images/...)`.
 *  - Inline: **tebal**, *miring*, `kode`, [teks](tautan).
 * Selain itu tidak didukung (HTML mentah, daftar bersarang, dll).
 */

export type Inline =
  | { type: "text"; text: string }
  | { type: "strong"; children: Inline[] }
  | { type: "em"; children: Inline[] }
  | { type: "code"; text: string }
  | { type: "link"; href: string; children: Inline[] };

export type Block =
  | { type: "heading"; level: 2 | 3; id: string; text: string; children: Inline[] }
  | { type: "paragraph"; children: Inline[] }
  | { type: "list"; ordered: boolean; items: Inline[][] }
  | { type: "table"; header: Inline[][]; rows: Inline[][][] }
  | { type: "callout"; children: Inline[] }
  | { type: "image"; src: string; alt: string };

export interface ParsedMarkdown {
  blocks: Block[];
  headings: { level: 2 | 3; id: string; text: string }[];
  wordCount: number;
}

const INLINE_PATTERN = /(\*\*[^*]+\*\*)|(\*[^*\s][^*]*\*)|(`[^`]+`)|(\[[^\]]+\]\([^)\s]+\))/;

export function parseInline(text: string): Inline[] {
  const out: Inline[] = [];
  let rest = text;
  while (rest.length > 0) {
    const m = INLINE_PATTERN.exec(rest);
    if (!m) {
      out.push({ type: "text", text: rest });
      break;
    }
    if (m.index > 0) out.push({ type: "text", text: rest.slice(0, m.index) });
    const token = m[0];
    if (m[1]) out.push({ type: "strong", children: parseInline(token.slice(2, -2)) });
    else if (m[2]) out.push({ type: "em", children: parseInline(token.slice(1, -1)) });
    else if (m[3]) out.push({ type: "code", text: token.slice(1, -1) });
    else {
      const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(token)!;
      out.push({ type: "link", href: link[2], children: parseInline(link[1]) });
    }
    rest = rest.slice(m.index + token.length);
  }
  return out;
}

/** Teks polos dari markdown inline (untuk id judul dan hitungan kata). */
export function plainText(text: string): string {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*`]/g, "")
    .trim();
}

export function slugify(text: string): string {
  return plainText(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const isBlank = (l: string) => l.trim() === "";
const isList = (l: string) => /^\s*[-*]\s+\S/.test(l);
const isOrdered = (l: string) => /^\s*\d+\.\s+\S/.test(l);
const isTable = (l: string) => /^\s*\|.*\|\s*$/.test(l);
const isImage = (l: string) => /^!\[[^\]]*\]\([^)\s]+\)\s*$/.test(l.trim());
const isSpecial = (l: string) =>
  /^#{1,6}\s/.test(l) || isList(l) || isOrdered(l) || isTable(l) || l.startsWith(">") || isImage(l);

function splitRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());
}

export function parseMarkdown(source: string): ParsedMarkdown {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const blocks: Block[] = [];
  const headings: ParsedMarkdown["headings"] = [];
  const usedIds = new Set<string>();
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (isBlank(line)) {
      i++;
      continue;
    }

    const h = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (h) {
      const level = h[1].length;
      if (level === 1) throw new Error('Judul "#" (H1) tidak boleh ada di isi artikel; H1 dibuat otomatis dari title. Pakai "##".');
      if (level > 3) throw new Error(`Judul level ${level} tidak didukung (pakai ## atau ###): "${h[2]}"`);
      const text = plainText(h[2]);
      let id = slugify(h[2]) || "bagian";
      for (let n = 2; usedIds.has(id); n++) id = `${slugify(h[2]) || "bagian"}-${n}`;
      usedIds.add(id);
      blocks.push({ type: "heading", level: level as 2 | 3, id, text, children: parseInline(h[2]) });
      headings.push({ level: level as 2 | 3, id, text });
      i++;
      continue;
    }

    if (isImage(line)) {
      const m = /^!\[([^\]]*)\]\(([^)\s]+)\)/.exec(line.trim())!;
      blocks.push({ type: "image", alt: m[1], src: m[2] });
      i++;
      continue;
    }

    if (isTable(line) && i + 1 < lines.length && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1])) {
      const header = splitRow(line).map(parseInline);
      i += 2;
      const rows: Inline[][][] = [];
      while (i < lines.length && isTable(lines[i])) {
        const cells = splitRow(lines[i]);
        if (cells.length !== header.length) throw new Error(`Baris tabel punya ${cells.length} kolom, seharusnya ${header.length}: "${lines[i].trim()}"`);
        rows.push(cells.map(parseInline));
        i++;
      }
      blocks.push({ type: "table", header, rows });
      continue;
    }

    if (isList(line) || isOrdered(line)) {
      const ordered = isOrdered(line);
      const items: Inline[][] = [];
      while (i < lines.length && (ordered ? isOrdered(lines[i]) : isList(lines[i]))) {
        items.push(parseInline(lines[i].replace(ordered ? /^\s*\d+\.\s+/ : /^\s*[-*]\s+/, "").trim()));
        i++;
      }
      blocks.push({ type: "list", ordered, items });
      continue;
    }

    if (line.startsWith(">")) {
      const parts: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        parts.push(lines[i].replace(/^>\s?/, "").trim());
        i++;
      }
      blocks.push({ type: "callout", children: parseInline(parts.join(" ")) });
      continue;
    }

    const parts: string[] = [];
    while (i < lines.length && !isBlank(lines[i]) && (parts.length === 0 || !isSpecial(lines[i]))) {
      parts.push(lines[i].trim());
      i++;
    }
    blocks.push({ type: "paragraph", children: parseInline(parts.join(" ")) });
  }

  const wordCount = plainText(source.replace(/^[|>#\-*\d.\s]+/gm, "")).split(/\s+/).filter(Boolean).length;
  return { blocks, headings, wordCount };
}
