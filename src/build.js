import { FileTree, Tree } from "@weborigami/async-tree";
import site from "./site.js";

// Build writes the site resources to the build folder
const buildTree = new FileTree(new URL("../build", import.meta.url).pathname);
await Tree.clear(buildTree);
await Tree.assign(buildTree, site);
