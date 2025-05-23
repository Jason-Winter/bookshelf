import db from "$lib/db.js";

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    let book = {
      name: data.get("name"),
      erscheinungsdatum: data.get("erscheinungsdatum"),
      genre: data.get("genre"),
    };
    await db.createBook(book);
    return { success: true };
  },
};
