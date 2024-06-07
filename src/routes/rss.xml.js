import { rss } from "@weborigami/origami";
import feed from "../feed.js";

/**
 * Generate the RSS feed.
 */
export default async () => rss.call(null, await feed());
