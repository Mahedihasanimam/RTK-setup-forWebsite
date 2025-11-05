// postinstall.js

const fs = require("fs");
const path = require("path");

function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(to, { recursive: true });
  for (const item of fs.readdirSync(from)) {
    const srcPath = path.join(from, item);
    const destPath = path.join(to, item);
    if (fs.lstatSync(srcPath).isDirectory()) {
      copyFolderSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  const srcPath = path.join(__dirname, "src");
  const destPath = path.join(process.cwd(), "src");

  console.log("📦 Copying RTK TypeScript setup files to project src folder...");

  copyFolderSync(srcPath, destPath);

  console.log("✅ RTK setup successfully installed!");
} catch (err) {
  console.error("❌ Error during postinstall:", err);
}
