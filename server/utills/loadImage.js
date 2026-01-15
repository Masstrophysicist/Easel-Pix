import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
export const loadImage = (filePath) => {
  return new Promise((resolve, reject) => {
    const fullPath = path.join(dirname, filePath);
    fs.readFile(fullPath, "base64", (err, result) => {
      if (err) reject(err);
      else resolve(`data:image/png;base64,${result}`);
    });
  });
};
