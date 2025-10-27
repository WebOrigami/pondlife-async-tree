import { marked } from "marked";
import fs from "node:fs";
import markdownDocument from "../markdownDocument.js";
import page from "./page.js";

// About page: transforms about.md to HTML and applies the page template
export default () => {
  const buffer = fs.readFileSync(
    new URL("../about.md", import.meta.url).pathname
  );
  const document = markdownDocument(buffer);
  return page({
    ...document,
    // Transform the body to HTML
    body: marked.parse(document.body),
  });
};
