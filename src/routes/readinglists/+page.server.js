import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load() {
  const readingLists = await db.getAllReadinglists();

  return {
    readingLists
  };
}