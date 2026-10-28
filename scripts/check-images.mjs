// Memeriksa semua URL gambar di src/data/images.ts:
//   - status HTTP & content-type
//   - ukuran file
//   - dimensi asli (PNG/JPEG/WebP) dibandingkan width/height di konfigurasi
// Jalankan: npm run check:images
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../src/data/images.ts", import.meta.url), "utf8");
const base = source.match(/const BASE = "([^"]+)"/)?.[1];
if (!base) throw new Error("Konstanta BASE tidak ditemukan di src/data/images.ts");

const entries = [...source.matchAll(/id: "([^"]+)",\s*src: `\$\{BASE\}\/([^`]+)`[\s\S]*?width: (\d+),\s*height: (\d+)/g)].map(
  ([, id, file, width, height]) => ({ id, url: `${base}/${file}`, width: Number(width), height: Number(height) }),
);

// Entri dengan path lokal (src: "/images/...") — diperiksa langsung di folder public/.
const localEntries = [...source.matchAll(/id: "([^"]+)",\s*src: "(\/[^"]+)"[\s\S]*?width: (\d+),\s*height: (\d+)/g)].map(
  ([, id, path, width, height]) => ({ id, path, width: Number(width), height: Number(height) }),
);

function dimensions(buf) {
  // PNG
  if (buf.readUInt32BE(0) === 0x89504e47) return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  // WebP
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") return { w: 1 + buf.readUIntLE(24, 3), h: 1 + buf.readUIntLE(27, 3) };
    if (chunk === "VP8 ") return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
    if (chunk === "VP8L") {
      const b = buf.readUInt32LE(21);
      return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 };
    }
  }
  // JPEG: cari marker SOF
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      if (buf[i] !== 0xff) return null;
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
      }
      i += 2 + len;
    }
  }
  return null;
}

// Server gambar kadang lambat/memutus koneksi; coba hingga 3 kali sebelum dianggap gagal.
async function download(url, attempts = 3) {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(90_000) });
      return { res, buf: Buffer.from(await res.arrayBuffer()), tries: i };
    } catch (err) {
      if (i >= attempts) throw err;
      await new Promise((r) => setTimeout(r, 2000 * i));
    }
  }
}

let failures = 0;
for (const e of entries) {
  try {
    const { res, buf, tries } = await download(e.url);
    if (tries > 1) console.log(`(percobaan ke-${tries}) ${e.id}`);
    const dim = dimensions(buf);
    const kb = Math.round(buf.length / 1024);
    const match = dim && dim.w === e.width && dim.h === e.height;
    const flag = !res.ok ? "GAGAL" : match ? "OK" : "DIMENSI BEDA";
    if (!res.ok) failures++;
    console.log(
      `${flag.padEnd(12)} ${String(res.status).padEnd(4)} ${String(kb).padStart(5)} KB  ` +
        `asli ${dim ? `${dim.w}x${dim.h}` : "?"}  konfigurasi ${e.width}x${e.height}  ${e.id}`,
    );
  } catch (err) {
    failures++;
    console.log(`GAGAL        ${e.id}  ${err.message}`);
  }
}
for (const e of localEntries) {
  try {
    const buf = await readFile(new URL(`../public${e.path}`, import.meta.url));
    const dim = dimensions(buf);
    const kb = Math.round(buf.length / 1024);
    const match = dim && dim.w === e.width && dim.h === e.height;
    console.log(
      `${(match ? "OK" : "DIMENSI BEDA").padEnd(12)} lokal ${String(kb).padStart(5)} KB  ` +
        `asli ${dim ? `${dim.w}x${dim.h}` : "?"}  konfigurasi ${e.width}x${e.height}  ${e.id}`,
    );
  } catch {
    failures++;
    console.log(`GAGAL        file lokal tidak ditemukan: public${e.path}  (${e.id})`);
  }
}
console.log(`\n${entries.length + localEntries.length} gambar diperiksa, ${failures} gagal.`);
process.exitCode = failures > 0 ? 1 : 0;
