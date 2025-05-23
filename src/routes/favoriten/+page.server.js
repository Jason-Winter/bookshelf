import db from "$lib/db.js";

export async function load() {
  return {
    readList: await db.getReadList() // Lade die Bücher aus der Leseliste
  };
}