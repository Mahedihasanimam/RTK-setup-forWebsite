const fs = require("fs");
const path = require("path");

const source = path.join(__dirname, "src");
const destination = path.join(process.cwd(), "rtk-setup-src");

function copyFolderSync(from, to) {
  fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach((file) => {
    const srcPath = path.join(from, file);
    const destPath = path.join(to, file);
    if (fs.lstatSync(srcPath).isDirectory()) {
      copyFolderSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

try {
  if (fs.existsSync(source)) {
    copyFolderSync(source, destination);
    console.log(
      "\x1b[32m✔ RTK Setup files copied to 'rtk-setup-src/' successfully!\x1b[0m"
    );
  } else {
    console.log("\x1b[33m⚠ Source folder not found: src/\x1b[0m");
  }
} catch (error) {
  console.error("\x1b[31m✖ Error copying files:", error, "\x1b[0m");
}
