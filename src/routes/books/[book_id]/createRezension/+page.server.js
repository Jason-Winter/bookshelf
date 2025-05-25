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

    if (rezension.bewertung < 1 || rezension.bewertung > 5) {
      return { success: false, error: "Fehler in der Validierung: Bewertung muss zwischen 1 und 5 liegen." };
    }
    if (rezension.text.length < 8 || rezension.text.length > 500) {
      return { success: false, error: "Fehler in der Validierung: Rezension muss zwischen 8 und 500 Zeichen lang sein." };
    }

    await db.createRezension(rezension);
    return { success: true };
  },
};
