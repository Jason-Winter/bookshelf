import db from "$lib/db.js";

export async function load() {
  const rezensionen = await db.getAllRezensionen();

  return {
    rezensionen 
  };
}