<script>
  let { data } = $props();
  let book = data.book;
  let averageRating = data.averageRating;

  // let rezensionen = [...data.rezensionen];

</script>

<div class="page-content">
  <a href="/books">Back</a>

  <h1>{book.title}</h1>
  <div class="row mt-3">
    <div class="col-3">
      <img class="img-fluid" src={book.cover} alt="" />
    </div>

    <div class="col">
      <p>Bewertung: {averageRating}</p>
      <p>Erscheinungsdatum: {book.datum}</p>
      <p>Genre: {book.genre}</p>
      <p>Beschreibung: {book.beschreibung}</p>
      <p>Autor: {book.autor}</p>
      <form method="POST" action="?/delete">
        <input type="hidden" name="id" value={book._id} />
        <button class="btn btn-danger">Delete Book</button>
      </form>
        {#if book.isFavorited}
      <form method="POST" action="?/removeFromReadList" use:enhance>
        <input type="hidden" name="id" value={book._id} />
        <button class="btn btn-danger">Von Leseliste entfernen</button>
      </form>
    {/if}
    {#if !book.isFavorited}
      <form method="POST" action="?/addToReadList" use:enhance>
        <input type="hidden" name="id" value={book._id} />
        <button class="btn btn-success">Auf die Leseliste</button>
      </form>
    {/if}
    </div>
  </div>
</div>
