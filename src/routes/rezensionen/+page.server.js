import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load() {
  // Lade alle Rezensionen aus der Datenbank
  const rezensionen = await db.getAllRezensionen();

  return {
    rezensionen // Rückgabe der Rezensionen
  };
}