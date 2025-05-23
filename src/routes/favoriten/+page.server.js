import db from "$lib/db.js";

export async function load() {
  // Lade die Favoriten aus der Datenbank
  const favoriten = await db.getFavorite();

  return {
    showFavorite: favoriten // Rückgabe der Favoritenliste
  };
}
