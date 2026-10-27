// Membuat sofacustom-out.zip berisi ISI folder out/ (tanpa folder pembungkus),
// siap diunggah lalu di-Extract langsung di public_html.
// Memakai tar.exe bawaan Windows 10+ (bsdtar) karena Compress-Archive di
// Windows PowerShell 5.1 menulis path dengan backslash yang rusak di server Linux.
import { execFileSync } from "node:child_process";
import { readdirSync, rmSync, statSync } from "node:fs";

const zip = "sofacustom-out.zip";
statSync("out/index.html"); // gagal jika belum build
rmSync(zip, { force: true });
execFileSync("tar", ["-a", "-cf", zip, "-C", "out", ...readdirSync("out")], { stdio: "inherit" });
const kb = Math.round(statSync(zip).size / 1024);
console.log(`package: ${zip} dibuat (${kb} KB). Unggah ke public_html lalu Extract di folder itu.`);
