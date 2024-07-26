import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const require = createRequire(import.meta.url);
export const __dirname = dirname(fileURLToPath(import.meta.url));
export const getDir = (filePath) =>
  join(dirname(fileURLToPath(new URL(".", import.meta.url))), filePath);

export const isEmptyObj = (obj) => {
  if (Object.keys(obj).length === 0) {
    return true;
  }
  return false;
};
