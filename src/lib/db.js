import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";
import { get } from "svelte/store";
import { v4 as uuidv4 } from "uuid";

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

// Funktion zum Formatieren des Datums
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Monate sind 0-basiert
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

async function createBook(book) {
  book.cover = "/img/platzhalter.png"; // default cover
  book.isFavorited = false;
  book.buch_id = uuidv4(); // generate a unique book id

  // Datum formatieren, falls vorhanden
  if (book.datum) {
    book.datum = formatDate(book.datum);
  }
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
    const rezensionen = await collection.aggregate({ buch_id: buch_id }).toArray();

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


async function getAllRezensionen() {
  let rezensionen = [];
  try {
    const collection = db.collection("rezension");

    const query = [
      {
        '$lookup': {
          'from': 'books',
          'localField': 'buch_id',
          'foreignField': 'buch_id',
          'as': 'book'
        }
      }, {
        '$unwind': {
          'path': '$book'
        }
      }
    ];

    // Get all objects that match the query
    rezensionen = await collection.aggregate(query).toArray();
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }

  // Parses all ObjectIds (even in nested objects such as vehicle/user to string)
  return JSON.parse(JSON.stringify(rezensionen));
}



async function createRezension(rezension) {
  rezension.rezension_id = uuidv4();
  rezension.benutzer_id = "6e9b8124-34f2-4f39-8a6f-9151e3a4912c";

  // Bewertung in einen Float umwandeln
  if (rezension.bewertung) {
    rezension.bewertung = parseFloat(rezension.bewertung);
  }
  try {
    const collection = db.collection("rezension");
    const result = await collection.insertOne(rezension);
    return result.insertedId.toString(); // convert ObjectId to String
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}


async function getAllDetails(buch_id) {
  let details = [];
  try {
    const collection = db.collection("books");

    const query = [
      {
        "$match": {
          "buch_id": buch_id
        }
      },
      {
        '$lookup': {
          'from': 'rezension',
          'localField': 'buch_id',
          'foreignField': 'buch_id',
          'pipeline': [
            {
              '$lookup': {
                'from': 'benutzer',
                'localField': 'benutzer_id',
                'foreignField': 'benutzer_id',
                'as': 'benutzer'
              }
            }
          ],
          'as': 'rezension'
        }
      }
    ];

    // Get all objects that match the query
    details = await collection.aggregate(query).toArray();
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }

  // Parses all ObjectIds (even in nested objects such as vehicle/user to string)
  return JSON.parse(JSON.stringify(details));
}


async function getReadinglist(id) {
  let readingList = null;
  try {
    const collection = db.collection("leseliste");
    const query = { _id: new ObjectId(id) }; // filter by id
    readingList = await collection.findOne(query);

    if (!readingList) {
      console.log("No reading list with id " + id);
      // TODO: errorhandling
    } else {
      readingList._id = readingList._id.toString(); // convert ObjectId to String
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return readingList;
}


async function getAllReadinglists() {
  let readingLists = [];
  try {
    const collection = db.collection("leseliste");

    const query = [
      {
        '$lookup': {
          'from': 'benutzer',
          'localField': 'benutzer_id',
          'foreignField': 'benutzer_id',
          'as': 'benutzer'
        }
      }, {
        '$unwind': {
          'path': '$benutzer'
        }
      }
    ];

    // Get all objects that match the query
    readingLists = await collection.aggregate(query).toArray();
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }

  // Parses all ObjectIds (even in nested objects such as vehicle/user to string)
  return JSON.parse(JSON.stringify(readingLists));
}


async function createReadingList(readingList) {
  readingList.benutzer_id = "6e9b8124-34f2-4f39-8a6f-9151e3a4912c";
  readingList.liste_id = uuidv4(); // generate a unique reading list id

  try {
    const collection = db.collection("leseliste");
    const result = await collection.insertOne(readingList);
    return result.insertedId.toString(); // convert ObjectId to String
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}


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
  getAllRezensionen,
  getAllDetails,
  createRezension,
  createReadingList,
  getReadinglist,
  getAllReadinglists
};
