import db from "$lib/db.js";

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    let book = {
      name: data.get("name"),
      datum: data.get("datum"),
      genre: data.get("genre"),
      autor: data.get("autor"),
      beschreibung: data.get("beschreibung"),
    };

    if (book.name.length < 3 || book.genre.length < 3) {
      return { success: false, error: "Fehler in der Validierung: Name und Genre müssen mindestens 3 Zeichen lang sein." };
    }
    if (book.datum.length === 0 || new Date(book.datum) >= new Date()) {
      return { success: false, error: "Fehler in der Validierung: Datum muss in der Vergangenheit liegen." };
    }
    if (book.autor.length < 3) {
      return { success: false, error: "Fehler in der Validierung: Autor muss mindestens 3 Zeichen lang sein." };
    }
    if (book.beschreibung.length < 10) {
      return { success: false, error: "Fehler in der Validierung: Beschreibung muss mindestens 10 Zeichen lang sein." };
    }

    await db.createBook(book);
    return { success: true };
  },
};