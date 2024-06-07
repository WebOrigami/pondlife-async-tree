import { FileTree } from "@weborigami/async-tree";
import { fileURLToPath } from "node:url";

/**
 * The files in the `images` folder are used as is.
 */
export default new FileTree(
  fileURLToPath(new URL("../../images", import.meta.url))
);
