import feed from "../feed.js";

export default async () => JSON.stringify(await feed(), null, 2);
