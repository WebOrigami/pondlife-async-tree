import { FileTree, Tree } from "@weborigami/async-tree";
import site from "./site.js";

// Build process writes the site resources to the build folder
const buildTree = new FileTree(new URL("../build", import.meta.url).pathname);
await Tree.clear(buildTree); // Erase any existing files
await Tree.assign(buildTree, site); // Copy site to build folder
