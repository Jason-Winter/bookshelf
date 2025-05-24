import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
  const book = await db.getBook(params.book_id);
  const averageRating = await db.getAverageRatingPerBook(book.buch_id);
  const details = await db.getAllDetails(book.buch_id); // Alle Details abrufen

  return {
    book,
    averageRating, // Durchschnittsbewertung zurückgeben
    details // Benutzerinformationen zurückgeben
  };
}

export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();

    await db.deleteBook(data.get("id"));
    redirect(303, "/books");
  },

  addFavorite: async ({ request }) => {
    let data = await request.formData();
    let book = {
      _id: data.get("id"),
      isFavorited: true
    }
    await db.updateBook(book)
  },
  removeFavorite: async ({ request }) => {
    let data = await request.formData();
    let book = {
      _id: data.get("id"),
      isFavorited: false
    }
    await db.updateBook(book)
  }
};
