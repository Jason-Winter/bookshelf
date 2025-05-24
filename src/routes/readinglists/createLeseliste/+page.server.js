import db from "$lib/db.js";

export async function load() {
  return {
    books: await db.getBooks()
  };
}

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    let readingList = {
      name: data.get("name"),
      beschreibung: data.get("beschreibung"),
      buch_ids: JSON.parse(data.get("buecher")),
    };
    await db.createReadingList(readingList);
    return { success: true };
  },
};
