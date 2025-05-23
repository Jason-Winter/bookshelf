<script>
  import { enhance } from '$app/forms';
  let { book } = $props();
</script>

<div class="book-card">
<a href={`/books/${book._id}`}><img
    class="img-fluid"
    src={book.cover || '/img/platzhalter.png'}
    alt={book.name || "Unbekanntes Buch"}
  /></a>
<div class="details">
  <div class="title">
    {book.name || "Unbekannter Titel"}
  </div>
  <div>
    von {book.autor || "Unbekannter Autor"}
  </div>
  <div>
    {book.genre || "Unbekanntes Genre"}
  </div>
</div>
</div>


<style>
  .book-card {
    border: 1px solid #555;
    height: 100%;
    background-color: white;
    color: black;
    position: relative;
    overflow: hidden;
  }

  .details {
    padding: 0.5em;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }

  .book-card:hover .details {
    transform: translateY(0%);
  }

  .title {
    font-weight: bold;
  }

  .img-fluid {
    width: 100%;
    height: auto;
    display: block;
  }
</style>
