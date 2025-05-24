import db from "$lib/db.js";

export async function load() {
  return {
    books: await db.getBooks()
  };
}

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    let buecher = data.get("buecher");

    // Überprüfe, ob der Wert von "buecher" gültig ist
    let buch_ids = [];
    if (buecher) {
      try {
        buch_ids = JSON.parse(buecher);
      } catch (error) {
        console.error("Fehler beim Parsen von buecher:", error);
      }
    }

    let readingList = {
      name: data.get("name"),
      beschreibung: data.get("beschreibung"),
      buch_ids: buch_ids,
    };

    console.log("Buch-IDs:", readingList.buch_ids);

    await db.createReadingList(readingList);
    return { success: true };
  },
};
