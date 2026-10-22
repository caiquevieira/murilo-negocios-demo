import path from "node:path";
import type { NextConfig } from "next";

// No GitHub Pages o site fica em /<repositório>; na Hostinger, na raiz. Definido no build via NEXT_PUBLIC_BASE_PATH.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Site 100% estático: pode ser hospedado em GitHub Pages, Vercel, Netlify, Hostinger etc.
  output: "export",
  basePath,
  trailingSlash: true,
  // O loader prefixa o basePath em todas as imagens (next/image não faz isso sozinho no export)
  images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts" },
  // Esconde o botão "N" de desenvolvimento do Next.js
  devIndicators: false,
  // O repositório LadingPages tem um package-lock na raiz; a raiz deste projeto é esta pasta.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
