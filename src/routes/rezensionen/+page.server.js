import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load() {
  const rezensionen = await db.getAllRezensionen();

  return {
    rezensionen 
  };
}