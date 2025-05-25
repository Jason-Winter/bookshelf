import db from "$lib/db.js";

export async function load() {
  const readingLists = await db.getAllReadinglists();

  return {
    readingLists
  };
}