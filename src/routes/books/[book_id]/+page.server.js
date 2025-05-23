import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
  const book = await db.getBook(params.book_id);
  const averageRating = await db.getAverageRatingPerBook(book.buch_id); // Durchschnittsbewertung berechnen

  return {
    book,
    averageRating, // Durchschnittsbewertung zurückgeben
  };
}

export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();

    await db.deleteBook(data.get("id"));
    redirect(303, "/books");
  },

  addToReadList: async ({ request }) => {
    let data = await request.formData();
    let book = {
      _id: data.get("id"),
      isFavorited: true
    }
    await db.updateBook(book)
  },
  removeFromReadList: async ({ request }) => {
    let data = await request.formData();
    let book = {
      _id: data.get("id"),
      isFavorited: false
    }
    await db.updateBook(book)
  }
};
