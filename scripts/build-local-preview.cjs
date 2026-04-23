const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
const sourcePath = path.join(root, "src", "main.tsx");
const distDir = path.join(root, "dist");
const assetsDir = path.join(distDir, "assets");

fs.mkdirSync(assetsDir, { recursive: true });

const source = fs
  .readFileSync(sourcePath, "utf8")
  .replace(/^import React[^\n]*\n/, "")
  .replace(/^import ReactDOM[^\n]*\n/, "")
  .replace(/^import "\.\/styles\.css";\n/, "");

const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.None,
    jsx: ts.JsxEmit.React,
    jsxFactory: "React.createElement",
    jsxFragmentFactory: "React.Fragment",
  },
  fileName: sourcePath,
}).outputText;

const bundled = `(() => {
  const { useEffect, useRef, useState } = React;
${transpiled}
})();
`;

fs.writeFileSync(path.join(assetsDir, "source-main.js"), bundled, "utf8");

fs.copyFileSync(
  path.join(root, "node_modules", "react", "umd", "react.production.min.js"),
  path.join(assetsDir, "react.production.min.js")
);
fs.copyFileSync(
  path.join(root, "node_modules", "react-dom", "umd", "react-dom.production.min.js"),
  path.join(assetsDir, "react-dom.production.min.js")
);

fs.writeFileSync(
  path.join(distDir, "index.html"),
  `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>张航宁 - 个人作品集</title>
    <meta name="description" content="张航宁的双语个人作品集，展示教育经历、竞赛成果、科研表达、代表项目和联系方式。" />
    <script src="/shawn/assets/react.production.min.js"></script>
    <script src="/shawn/assets/react-dom.production.min.js"></script>
    <script defer src="/shawn/assets/source-main.js"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`,
  "utf8"
);

console.log("Local preview built from src/main.tsx");
