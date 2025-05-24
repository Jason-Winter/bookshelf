import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
  const readingList = await db.getReadinglist(params.list_id);

  return {
    readingList,
    books: await db.getBooks()
  };
}