// Publica a demo no GitHub Pages: build com basePath = /<repositório> e noindex,
// depois envia a pasta out/ para a branch gh-pages do remoto "origin".
// Uso: npm run publicar:demo
import { execSync } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";

const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });
const read = (cmd) => execSync(cmd, { encoding: "utf8" }).trim();

const remote = read("git remote get-url origin");
const repo = remote.replace(/\.git$/, "").split("/").pop();
const commit = read("git rev-parse --short HEAD");
const owner = remote.split("/").slice(-2, -1)[0];
const demoUrl = `https://${owner}.github.io/${repo}`;

console.log(`\n▶ Build da demo para /${repo}\n`);
rmSync("out", { recursive: true, force: true });
run("npx next build", {
  env: { ...process.env, NEXT_PUBLIC_BASE_PATH: `/${repo}`, NEXT_PUBLIC_SITE_URL: demoUrl, NEXT_PUBLIC_DEMO: "1", MSYS_NO_PATHCONV: "1" },
});

// Demo fora dos buscadores (a meta robots noindex já vem do build)
writeFileSync("out/robots.txt", "User-agent: *\nDisallow: /\n");
writeFileSync("out/.nojekyll", "");

console.log("\n▶ Enviando out/ para a branch gh-pages\n");
const name = read("git config user.name");
const email = read("git config user.email");
run("git init -q -b gh-pages", { cwd: "out" });
run("git add -A", { cwd: "out" });
run(`git -c user.name="${name}" -c user.email="${email}" commit -q -m "Demo publicada a partir de ${commit}"`, { cwd: "out" });
run(`git push -q -f "${remote}" gh-pages`, { cwd: "out" });
rmSync("out/.git", { recursive: true, force: true });

console.log(`\n✓ Publicado: ${demoUrl}/\n`);
