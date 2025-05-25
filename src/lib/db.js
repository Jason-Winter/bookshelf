import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";
import { v4 as uuidv4 } from "uuid";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("BookShelf"); // Datenbank auswählen

// Alle Bücher abrufen
async function getBooks() {
  let books = [];
  try {
    const collection = db.collection("books");
    const query = {};

    // Alle Objekte abrufen, die der Abfrage entsprechen
    books = await collection.find(query).toArray();
    books.forEach((book) => {
      book._id = book._id.toString(); // ObjectId in String umwandeln
    });
  } catch (error) {
    console.log(error);
    // TODO: Fehlerbehandlung
  }
  return books;
}

// Ein Buch anhand der ID abrufen
async function getBook(id) {
  let book = null;
  try {
    const collection = db.collection("books");
    const query = { _id: new ObjectId(id) }; // Nach ID filtern
    book = await collection.findOne(query);

    if (!book) {
      console.log("Kein Buch mit der ID " + id);
      // TODO: Fehlerbehandlung
    } else {
      book._id = book._id.toString(); // ObjectId in String umwandeln
    }
  } catch (error) {
    // TODO: Fehlerbehandlung
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

// Ein Buch erstellen
async function createBook(book) {
  book.cover = "/img/platzhalter.png"; // Standard-Cover
  book.isFavorited = false;
  book.buch_id = uuidv4(); // Eindeutige Buch-ID generieren

  // Datum formatieren, falls vorhanden
  if (book.datum) {
    book.datum = formatDate(book.datum);
  }
  try {
    const collection = db.collection("books");
    const result = await collection.insertOne(book);
    return result.insertedId.toString(); // ObjectId in String umwandeln
  } catch (error) {
    // TODO: Fehlerbehandlung
    console.log(error.message);
  }
  return null;
}

// Buch aktualisieren
// Rückgabe: ID des aktualisierten Buchs oder null, falls das Buch nicht aktualisiert werden konnte
async function updateBook(book) {
  try {
    let id = book._id;
    delete book._id; // _id aus dem Objekt entfernen, da _id nicht aktualisiert werden kann
    const collection = db.collection("books");
    const query = { _id: new ObjectId(id) }; // Nach ID filtern
    const result = await collection.updateOne(query, { $set: book });

    if (result.matchedCount === 0) {
      console.log("Kein Buch mit der ID " + id);
      // TODO: Fehlerbehandlung
    } else {
      console.log("Buch mit der ID " + id + " wurde aktualisiert.");
      return id;
    }
  } catch (error) {
    // TODO: Fehlerbehandlung
    console.log(error.message);
  }
  return null;
}

// Buch anhand der ID löschen
// Rückgabe: ID des gelöschten Buchs oder null, falls das Buch nicht gelöscht werden konnte
async function deleteBook(id) {
  try {
    const collection = db.collection("books");
    const query = { _id: new ObjectId(id) }; // Nach ID filtern
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("Kein Buch mit der ID " + id);
    } else {
      console.log("Buch mit der ID " + id + " wurde erfolgreich gelöscht.");
      return id;
    }
  } catch (error) {
    // TODO: Fehlerbehandlung
    console.log(error.message);
  }
  return null;
}

// Zufälliges Buch des Tages abrufen
async function getDailyRandomBook() {
  try {
    const collection = db.collection("books");

    // Alle Bücher aus der Datenbank abrufen
    const books = await collection.find({}).toArray();

    if (books.length === 0) {
      console.log("Keine Bücher in der Datenbank gefunden.");
      return null;
    }

    // Aktuelles Datum verwenden, um einen Index zu berechnen
    const today = new Date();
    const dayOfYear = Math.floor(
      (today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
    );
    const randomIndex = dayOfYear % books.length;

    // Buch basierend auf dem berechneten Index auswählen
    const randomBook = books[randomIndex];
    randomBook._id = randomBook._id.toString(); // ObjectId in String umwandeln

    return randomBook;
  } catch (error) {
    console.log("Fehler beim Abrufen des täglichen zufälligen Buchs:", error.message);
    return null;
  }
}

// Favorisierte Bücher abrufen
async function getFavorite() {
  try {
    const collection = db.collection("books");

    // Bücher filtern, deren `isFavorited` auf `true` gesetzt ist
    const books = await collection.find({ isFavorited: true }).toArray();

    // _id-Felder in Strings umwandeln
    books.forEach((book) => {
      book._id = book._id.toString();
    });

    return books; // Gefilterte Bücher zurückgeben
  } catch (error) {
    console.log("Fehler beim Abrufen der Favoriten:", error.message);
    return []; // Leere Liste im Fehlerfall zurückgeben
  }
}

// Durchschnittsbewertung für ein Buch berechnen
async function getAverageRatingPerBook(buch_id) {
  try {
    const collection = db.collection("rezension");

    // Aggregation, um den Durchschnitt für ein spezifisches Buch zu berechnen
    const result = await collection.aggregate([
      {
        $match: { buch_id: buch_id } // Nach der spezifischen Buch-ID filtern
      },
      {
        $group: {
          _id: "$buch_id", // Nach Buch-ID gruppieren
          averageRating: { $avg: "$bewertung" } // Durchschnitt der Bewertungen berechnen
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


// Rezensionen für ein Buch abrufen
async function getRezensionen(buch_id) {
  try {
    const collection = db.collection("rezension");

    // Alle Rezensionen finden, die zur angegebenen Buch-ID gehören
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

// Alle Rezensionen abrufen
async function getAllRezensionen() {
  let rezensionen = [];
  try {
    const collection = db.collection("rezension");

    // Rezensionen mit zugehörigen Büchern verknüpfen
    const query = [
      {
        $lookup: {
          from: "books", // Verknüpfung mit der "books"-Sammlung
          localField: "buch_id",
          foreignField: "buch_id",
          as: "book"
        }
      },
      {
        $unwind: {
          path: "$book" // Entpacken des verknüpften Buches
        }
      }
    ];

    // Alle Objekte abrufen, die der Abfrage entsprechen
    rezensionen = await collection.aggregate(query).toArray();
  } catch (error) {
    console.log("Fehler beim Abrufen aller Rezensionen:", error.message);
  }

  // Alle ObjectIds in Strings umwandeln
  return JSON.parse(JSON.stringify(rezensionen));
}

// Eine Rezension erstellen
async function createRezension(rezension) {
  rezension.rezension_id = uuidv4(); // Eindeutige ID für die Rezension generieren
  rezension.benutzer_id = "6e9b8124-34f2-4f39-8a6f-9151e3a4912c"; // Beispiel-Benutzer-ID

  // Bewertung in einen Float umwandeln, falls vorhanden
  if (rezension.bewertung) {
    rezension.bewertung = parseFloat(rezension.bewertung);
  }
  try {
    const collection = db.collection("rezension");
    const result = await collection.insertOne(rezension);
    return result.insertedId.toString(); // ObjectId in String umwandeln
  } catch (error) {
    console.log("Fehler beim Erstellen der Rezension:", error.message);
  }
  return null;
}

// Alle Details zu einem Buch abrufen
async function getAllDetails(buch_id) {
  let details = [];
  try {
    const collection = db.collection("books");

    // Aggregation, um Buchdetails und zugehörige Rezensionen zu verknüpfen
    const query = [
      {
        $match: {
          buch_id: buch_id // Nach der Buch-ID filtern
        }
      },
      {
        $lookup: {
          from: "rezension", // Verknüpfung mit der "rezension"-Sammlung
          localField: "buch_id",
          foreignField: "buch_id",
          pipeline: [
            {
              $lookup: {
                from: "benutzer", // Verknüpfung mit der "benutzer"-Sammlung
                localField: "benutzer_id",
                foreignField: "benutzer_id",
                as: "benutzer"
              }
            }
          ],
          as: "rezension"
        }
      }
    ];

    // Alle Objekte abrufen, die der Abfrage entsprechen
    details = await collection.aggregate(query).toArray();
  } catch (error) {
    console.log("Fehler beim Abrufen der Buchdetails:", error.message);
  }

  // Alle ObjectIds in Strings umwandeln
  return JSON.parse(JSON.stringify(details));
}


// Eine Leseliste anhand der ID abrufen
async function getReadinglist(id) {
  let readingList = null;
  try {
    const collection = db.collection("leseliste");
    const query = { _id: new ObjectId(id) }; // Nach ID filtern
    readingList = await collection.findOne(query);

    if (!readingList) {
      console.log("Keine Leseliste mit der ID " + id);
      // TODO: Fehlerbehandlung
    } else {
      readingList._id = readingList._id.toString(); // ObjectId in String umwandeln
    }
  } catch (error) {
    // TODO: Fehlerbehandlung
    console.log(error.message);
  }
  return readingList;
}

// Alle Leselisten abrufen
async function getAllReadinglists() {
  let readingLists = [];
  try {
    const collection = db.collection("leseliste");

    const query = [
      {
        $lookup: {
          from: "benutzer", // Verknüpfung mit der "benutzer"-Sammlung
          localField: "benutzer_id",
          foreignField: "benutzer_id",
          as: "benutzer"
        }
      },
      {
        $unwind: {
          path: "$benutzer" // Entpacken des verknüpften Benutzers
        }
      }
    ];

    // Alle Objekte abrufen, die der Abfrage entsprechen
    readingLists = await collection.aggregate(query).toArray();
  } catch (error) {
    console.log("Fehler beim Abrufen der Leselisten:", error.message);
    // TODO: Fehlerbehandlung
  }

  // Alle ObjectIds (auch in verschachtelten Objekten) in Strings umwandeln
  return JSON.parse(JSON.stringify(readingLists));
}

// Eine Leseliste erstellen
async function createReadingList(readingList) {
  readingList.benutzer_id = "6e9b8124-34f2-4f39-8a6f-9151e3a4912c"; // Beispiel-Benutzer-ID
  readingList.liste_id = uuidv4(); // Eindeutige Leselisten-ID generieren

  try {
    const collection = db.collection("leseliste");
    const result = await collection.insertOne(readingList);
    return result.insertedId.toString(); // ObjectId in String umwandeln
  } catch (error) {
    console.log("Fehler beim Erstellen der Leseliste:", error.message);
    // TODO: Fehlerbehandlung
  }
  return null;
}

// Anzahl der Bücher, Leselisten und Rezensionen abrufen
async function getCounts() {
  try {
    const booksCount = await db.collection("books").countDocuments(); // Anzahl der Bücher
    const readingListsCount = await db.collection("leseliste").countDocuments(); // Anzahl der Leselisten
    const reviewsCount = await db.collection("rezension").countDocuments(); // Anzahl der Rezensionen

    return {
      books: booksCount,
      readingLists: readingListsCount,
      reviews: reviewsCount
    };
  } catch (error) {
    console.log("Fehler beim Abrufen der Zählwerte:", error.message);
    return null;
  }
}

// Exportieren der Funktionen für die Verwendung in anderen Modulen
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
  getAllReadinglists,
  getDailyRandomBook,
  getCounts
};
