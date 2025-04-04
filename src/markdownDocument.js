import { toString } from "@weborigami/async-tree";

// If the text has front matter, parse it and return the object along with a
// `body` property holding the body text. If there's no front matter, the object
// will just have `body`.
export default function markdownDocument(content) {
  let text = toString(content);
  let data;
  const regex =
    /^(---\r?\n(?<frontText>[\s\S]*?\r?\n?)---\r?\n)(?<body>[\s\S]*$)/;
  const match = regex.exec(text);
  if (match?.groups) {
    const { frontText, body } = match.groups;
    text = body;
    // Parse each line of front text as `key: value` and add it to the data object.
    const lines = frontText.split("\n").filter((line) => line.trim());
    const entries = lines.map((line) =>
      line.split(":").map((part) => part.trim())
    );
    data = Object.fromEntries(entries);
  }
  return Object.assign({ body: text }, data);
}
