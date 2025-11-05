const fs = require("fs");
const path = require("path");

const source = path.join(__dirname, "src"); // package src folder
const projectRoot = process.cwd(); // user project folder

// Decide destination dynamically
let destination;
if (fs.existsSync(path.join(projectRoot, "src"))) {
  destination = path.join(projectRoot, "src", "redux");
} else if (fs.existsSync(path.join(projectRoot, "app"))) {
  destination = path.join(projectRoot, "app", "redux");
} else {
  // create src if not exists
  destination = path.join(projectRoot, "src", "redux");
}

// Recursive copy function
function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) fs.mkdirSync(to, { recursive: true });
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

// Run copy
try {
  if (!fs.existsSync(source)) {
    console.log("\x1b[33mSource folder not found: src/\x1b[0m");
  } else {
    copyFolderSync(source, destination);
    console.log(
      `\x1b[32mRTK Setup files copied to '${destination}' successfully!\x1b[0m`
    );
  }
} catch (error) {
  console.error("\x1b[31mError copying files:", error, "\x1b[0m");
}
