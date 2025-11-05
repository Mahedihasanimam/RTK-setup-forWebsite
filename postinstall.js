const fs = require("fs");
const path = require("path");

const source = path.join(__dirname, "src");

// Decide destination
let destination;
const projectSrc = path.join(process.cwd(), "src");
const projectApp = path.join(process.cwd(), "app");

if (fs.existsSync(projectSrc)) {
  destination = path.join(projectSrc, "redux");
} else if (fs.existsSync(projectApp)) {
  destination = path.join(projectApp, "redux");
} else {
  // If neither exists, create src/
  destination = projectSrc;
}

// Recursive copy
function copyFolderSync(from, to) {
  fs.mkdirSync(to, { recursive: true });
  const files = fs.readdirSync(from);
  files.forEach((file) => {
    const srcPath = path.join(from, file);
    const destPath = path.join(to, file);
    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
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
      `\x1b[32mRTK Setup files copied to '${destination}' successfully!\x1b[0m`
    );
  } else {
    console.log("\x1b[33mSource folder not found: src/\x1b[0m");
  }
} catch (error) {
  console.error("\x1b[31mError copying files:", error, "\x1b[0m");
}
