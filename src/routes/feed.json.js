import feed from "../feed.js";

/**
 * Generate the JSON Feed.
 */
export default async () => JSON.stringify(await feed(), null, 2);
