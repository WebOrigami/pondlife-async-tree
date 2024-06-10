import { cache, FileTree } from "@weborigami/async-tree";
import dropbox from "@weborigami/dropbox";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

// Load credentials from local JSON file and use those to connect to Dropbox.
const credentialsPath = fileURLToPath(new URL("creds.json", import.meta.url));
const credentialsBuffer = await fs.readFile(credentialsPath);
const credentials = JSON.parse(String(credentialsBuffer));
const dropboxTree = await dropbox(credentials, "pondlife");

// We'll cache the Dropbox files locally in a `cache` folder.
const cachePath = fileURLToPath(new URL("../cache", import.meta.url));
const cacheTree = new FileTree(cachePath);

export default cache(dropboxTree, cacheTree);
