import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
  const book = await db.getBook(params.book_id);

  return {
    book
  };
}


export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    let rezension = {
      bewertung: data.get("bewertung"),
      text: data.get("text"),
      buch_id: data.get("buch_id"),
    };
    await db.createRezension(rezension);
    return { success: true };
  },
};
