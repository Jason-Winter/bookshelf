<script>
  export let data;
  let book = data.book;
</script>

<a href="/books">Back</a>

<h1>{book.title}</h1>
<div class="row mt-3">
  <div class="col-3">
    <img class="img-fluid" src={book.poster} alt="" />
  </div>

  <div class="col">
    <p>Jahr: {book.year}</p>
    <p>Dauer: {book.length}</p>
    <p>Cast:</p>
    <ul>
      {#each book.actors as actor}
        <li>{actor}</li>
      {/each}
    </ul>
    <form method="POST" action="?/delete">
      <input type="hidden" name="id" value={book._id}>
      <button class="btn btn-danger">Delete Book</button>
    </form>
  </div>
</div>
