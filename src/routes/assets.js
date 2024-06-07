import { FileTree } from "@weborigami/async-tree";
import { fileURLToPath } from "node:url";

/**
 * The files in the `assets` folder are used as is.
 */
export default new FileTree(
  fileURLToPath(new URL("../assets", import.meta.url))
);
