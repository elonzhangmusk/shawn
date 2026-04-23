const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "dist");
const port = 4173;
const host = "127.0.0.1";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
};

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, {
    "Content-Type": mimeTypes[ext] || "application/octet-stream",
  });
  fs.createReadStream(filePath).pipe(res);
}

http
  .createServer((req, res) => {
    const requestPath = decodeURIComponent((req.url || "/").split("?")[0]);
    const normalizedPath = requestPath.startsWith("/shawn/")
      ? requestPath.slice("/shawn".length)
      : requestPath;
    const relativePath = normalizedPath === "/" ? "/index.html" : normalizedPath;
    const absolutePath = path.join(root, relativePath);

    if (fs.existsSync(absolutePath) && fs.statSync(absolutePath).isFile()) {
      sendFile(res, absolutePath);
      return;
    }

    sendFile(res, path.join(root, "index.html"));
  })
  .listen(port, host, () => {
    console.log(`Preview ready: http://${host}:${port}`);
  });
