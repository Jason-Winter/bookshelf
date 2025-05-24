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
    await db.createBook(book);
    return { success: true };
  },
};
