import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load() {
  // Lade alle Leselisten aus der Datenbank
  const readingLists = await db.getAllReadinglists();

  return {
    readingLists // Rückgabe der Leselisten
  };
}