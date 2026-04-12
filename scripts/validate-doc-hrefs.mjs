import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const srcDir = path.join(root, "src");

/** Only scan files that intentionally emit user-facing /docs links. */
function shouldScanForDocHrefs(absPath) {
  const n = absPath.split(path.sep).join("/");
  if (n.includes("/src/app/docs/")) return true;
  if (n.endsWith("/src/components/layout/DocsSidebar.tsx")) return true;
  if (n.endsWith("/src/components/layout/DocsHeader.tsx")) return true;
  if (n.endsWith("/src/lib/docs-scope-links.ts")) return true;
  if (n.endsWith("/src/lib/authority-map.ts")) return true;
  if (n.endsWith("/src/lib/system-runtime-spine.ts")) return true;
  if (n.endsWith("/src/lib/docs.ts")) return true;
  if (n.endsWith("/src/lib/docs-glossary.ts")) return true;
  if (n.endsWith("/src/lib/docs/concept-registry.ts")) return true;
  if (n.endsWith("/src/lib/client-canonical.ts")) return true;
  return false;
}

function walkFiles(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === "node_modules" || ent.name === ".next") continue;
      walkFiles(p, acc);
    } else if (/\.(tsx|ts)$/.test(ent.name)) acc.push(p);
  }
  return acc;
}

/** @returns {Set<string>} */
function collectDocRoutes() {
  const docsRoot = path.join(srcDir, "app", "docs");
  const routes = new Set();
  if (!fs.existsSync(docsRoot)) return routes;

  function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(p);
      else if (ent.name === "page.tsx") {
        const rel = path.relative(docsRoot, path.dirname(p));
        const posix = rel.split(path.sep).join("/");
        routes.add(!posix || posix === "." ? "/docs" : `/docs/${posix}`);
      }
    }
  }
  walk(docsRoot);
  return routes;
}

function normalizeDocHref(h) {
  let x = h.replace(/\/+$/, "");
  const hash = x.indexOf("#");
  if (hash !== -1) x = x.slice(0, hash);
  if (x === "/docs/qagent") x = "/docs/q-agent";
  return x;
}

const docRoutes = collectDocRoutes();
const files = walkFiles(srcDir).filter(shouldScanForDocHrefs);

/** Object literal `href: "/docs/..."` and `<Link href="/docs/..."` */
const hrefRes = [
  /\bhref:\s*["'](\/docs\/[A-Za-z0-9_\-./[\]]+)["']/g,
  /<Link[^>\n]*\bhref=["'](\/docs\/[A-Za-z0-9_\-./[\]]+)["']/g,
];

/** @type {Set<string>} */
const hrefs = new Set();
for (const f of files) {
  const txt = fs.readFileSync(f, "utf8");
  for (const re of hrefRes) {
    let m;
    const r = new RegExp(re.source, re.flags);
    while ((m = r.exec(txt))) hrefs.add(normalizeDocHref(m[1]));
  }
}

const dynamicMatchers = [
  /^\/docs\/system\/[^/]+$/,
  /^\/docs\/architecture\/modules\/[^/]+$/,
  /^\/docs\/sections\/[^/]+$/,
];
const bad = [];
for (const h of hrefs) {
  if (h.includes("${") || h.includes("`")) continue;
  if (docRoutes.has(h)) continue;
  if (dynamicMatchers.some((re) => re.test(h))) continue;
  bad.push(h);
}
bad.sort();
if (bad.length) {
  console.error("Missing doc routes for hrefs:\n" + bad.join("\n"));
  process.exit(1);
}
console.log("OK:", hrefs.size, "normalized /docs hrefs in scanned files.");
