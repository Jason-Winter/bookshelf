import db from "$lib/db.js";

export async function load() {
  return {
    books: await db.getBooks()
  };
}

export const actions = {
  addToReadList: async ({ request }) => {
    let data = await request.formData();
    let book = {
      _id: data.get("id"),
      read: true
    }
    await db.updateBook(book)
  },
  removeFromReadList: async ({ request }) => {
    let data = await request.formData();
    let book = {
      _id: data.get("id"),
      read: false
    }
    await db.updateBook(book)
  }
}
