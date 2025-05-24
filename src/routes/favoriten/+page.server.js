import db from "$lib/db.js";

export async function load() {
  const favoriten = await db.getFavorite();

  return {
    showFavorite: favoriten 
  };
}
