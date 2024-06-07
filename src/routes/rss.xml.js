import { rss } from "@weborigami/origami";
import feed from "../feed.js";

export default async () => rss.call(null, await feed());
