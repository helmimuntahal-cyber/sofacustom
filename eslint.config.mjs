import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(["node_modules/**", ".next/**", "out/**", "next-env.d.ts"]),
  {
    rules: {
      // Gambar sengaja memakai <img> biasa karena situs di-export statis
      // dan URL gambar harus tetap URL asli dari server WordPress.
      "@next/next/no-img-element": "off",
    },
  },
]);
