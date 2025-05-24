import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";
import { get } from "svelte/store";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("BookShelf"); // select database

//////////////////////////////////////////
// Movies
//////////////////////////////////////////

// Get all books
async function getBooks() {
  let books = [];
  try {
    const collection = db.collection("books");

    // You can specify a query/filter here
    // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
    const query = {};

    // Get all objects that match the query
    books = await collection.find(query).toArray();
    books.forEach((book) => {
      book._id = book._id.toString(); // convert ObjectId to String
    });
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }
  return books;
}

// Get book by id
async function getBook(id) {
  let book = null;
  try {
    const collection = db.collection("books");
    const query = { _id: new ObjectId(id) }; // filter by id
    book = await collection.findOne(query);

    if (!book) {
      console.log("No book with id " + id);
      // TODO: errorhandling
    } else {
      book._id = book._id.toString(); // convert ObjectId to String
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return book;
}

// create book
// Example book object:
/* 
{ 
  title: "Das Geheimnis von Altura",
  year: 2024,
  length: "120 Minuten"
} 
*/
async function createBook(book) {
  book.poster = "/img/placeholder.jpg"; // default poster
  book.actors = [];
  book.read = false;
  try {
    const collection = db.collection("books");
    const result = await collection.insertOne(book);
    return result.insertedId.toString(); // convert ObjectId to String
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// update book
// Example book object:
/* 
{ 
  _id: "6630e72c95e12055f661ff13",
  title: "Das Geheimnis von Altura",
  year: 2024,
  length: "120 Minuten",
  actors: [
    "Lena Herzog",
    "Maximilian Schröder",
    "Sophia Neumann"
  ],
  poster: "/images/Altura.png",
  watchlist: false
} 
*/
// returns: id of the updated book or null, if book could not be updated
async function updateBook(book) {
  try {
    let id = book._id;
    delete book._id; // delete the _id from the object, because the _id cannot be updated
    const collection = db.collection("books");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.updateOne(query, { $set: book });

    if (result.matchedCount === 0) {
      console.log("No book with id " + id);
      // TODO: errorhandling
    } else {
      console.log("Book with id " + id + " has been updated.");
      return id;
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// delete book by id
// returns: id of the deleted book or null, if book could not be deleted
async function deleteBook(id) {
  try {
    const collection = db.collection("books");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("No book with id " + id);
    } else {
      console.log("Book with id " + id + " has been successfully deleted.");
      return id;
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}


async function getFavorite() {
  try {
    const collection = db.collection("books");

    // Filtere Bücher, deren `isFavorited` auf `true` gesetzt ist
    const books = await collection.find({ isFavorited: true }).toArray();

    // Konvertiere die `_id`-Felder in Strings
    books.forEach((book) => {
      book._id = book._id.toString();
    });

    return books; // Rückgabe der gefilterten Bücher
  } catch (error) {
    console.log("Fehler beim Abrufen der Favoriten:", error.message);
    return []; // Rückgabe einer leeren Liste im Fehlerfall
  }
}


async function getAverageRatingPerBook(buch_id) {
  try {
    const collection = db.collection("rezension");

    // Aggregation, um den Durchschnitt für ein spezifisches Buch zu berechnen
    const result = await collection.aggregate([
      {
        $match: { buch_id: buch_id } // Filtere nach der spezifischen Buch-ID (als String)
      },
      {
        $group: {
          _id: "$buch_id", // Gruppiere nach Buch-ID
          averageRating: { $avg: "$bewertung" } // Berechne den Durchschnitt der Bewertungen
        }
      }
    ]).toArray();

    if (result.length > 0) {
      return parseFloat(result[0].averageRating.toFixed(1));
    } else {
      console.log("Keine Bewertungen für dieses Buch gefunden.");
      return null;
    }
  } catch (error) {
    console.log("Fehler beim Berechnen des Durchschnitts: ", error.message);
    return null;
  }
}


async function getRezensionen(buch_id) {
  try {
    const collection = db.collection("rezension");

    // Finde alle Rezensionen, die zur angegebenen Buch-ID gehören
    const rezensionen = await collection.find({ buch_id: buch_id }).toArray();

    // Optional: Konvertiere `_id`-Felder in Strings
    rezensionen.forEach((rezension) => {
      rezension._id = rezension._id.toString();
    });

    return rezensionen; // Rückgabe der Rezensionen
  } catch (error) {
    console.log("Fehler beim Abrufen der Rezensionen:", error.message);
    return []; // Rückgabe einer leeren Liste im Fehlerfall
  }
}

/* async function getUser(benutzer_id) {
  let user = null;
  try {
    const collection = db.collection("benutzer");
    const query = { _id: new ObjectId(benutzer_id) }; // filter by id
    user = await collection.findOne(query);

    if (!user) {
      console.log("No user with id " + benutzer_id);
      // TODO: errorhandling
    } else {
      user._id = user._id.toString(); // convert ObjectId to String
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return user;
} */


// export all functions so that they can be used in other files
export default {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  getFavorite,
  getAverageRatingPerBook,
  getRezensionen, 
  getUser
};
