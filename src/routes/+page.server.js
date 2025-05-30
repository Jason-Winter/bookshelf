import db from "$lib/db.js";

export async function load() {
  const book = await db.getDailyRandomBook();
  const stats = await db.getCounts();
 
  return {
    book,
    stats
  };
}