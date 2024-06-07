import { FileTree } from "@weborigami/async-tree";
import { fileURLToPath } from "node:url";

const markdownPath = fileURLToPath(new URL("../markdown", import.meta.url));
export default new FileTree(markdownPath);
