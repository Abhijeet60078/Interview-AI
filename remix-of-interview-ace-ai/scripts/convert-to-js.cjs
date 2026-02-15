/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const repoRoot = path.resolve(__dirname, "..");

const ignoreDirs = new Set(["node_modules", "dist", ".git", ".vite", "coverage"]);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (ignoreDirs.has(entry.name)) continue;
      walk(path.join(dir, entry.name), files);
    } else if (entry.isFile()) {
      files.push(path.join(dir, entry.name));
    }
  }
  return files;
}

function transpileFile(filePath) {
  const ext = path.extname(filePath);
  const isTsx = ext === ".tsx";
  const source = fs.readFileSync(filePath, "utf8");
  const result = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.ReactJSX,
      sourceMap: false,
      removeComments: false,
      importsNotUsedAsValues: ts.ImportsNotUsedAsValues.Remove,
      preserveValueImports: false,
    },
    fileName: filePath,
  });

  const outExt = isTsx ? ".jsx" : ".js";
  const outPath = filePath.slice(0, -ext.length) + outExt;

  fs.writeFileSync(outPath, result.outputText, "utf8");
  fs.unlinkSync(filePath);
}

function updateImportExtensions(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const updated = content
    .replace(/\.tsx(\"|\')/g, ".jsx$1")
    .replace(/\.ts(\"|\')/g, ".js$1");
  if (updated !== content) {
    fs.writeFileSync(filePath, updated, "utf8");
  }
}

function main() {
  const allFiles = walk(repoRoot);
  const tsFiles = allFiles.filter((file) => file.endsWith(".ts") || file.endsWith(".tsx"));

  for (const filePath of tsFiles) {
    if (filePath.endsWith(".d.ts")) {
      fs.unlinkSync(filePath);
      continue;
    }
    transpileFile(filePath);
  }

  const jsFiles = walk(repoRoot).filter((file) => file.endsWith(".js") || file.endsWith(".jsx"));
  for (const filePath of jsFiles) {
    updateImportExtensions(filePath);
  }
}

main();
