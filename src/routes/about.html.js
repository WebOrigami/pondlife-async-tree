import { mdHandler, mdHtml } from "@weborigami/origami";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import page from "../templates/page.js";

export default async () => {
  const aboutPath = fileURLToPath(new URL("../about.md", import.meta.url));
  const buffer = await fs.readFile(aboutPath);
  const markdown = await mdHandler.unpack(buffer);
  const html = await mdHtml(markdown);
  return page(html);
};
