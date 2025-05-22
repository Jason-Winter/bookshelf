<script>
  import { enhance } from '$app/forms';
  let { book } = $props();
</script>

<div class="book-card">
  <div>
    <img class="img-fluid" src={book.cover} alt="" />
  </div>
  <div class="details">
    <div class="title">
      <a href={"/books/" + book._id}>{book.name}</a>
    </div>
    <div>
      Datum: {book.datum}
    </div>
    <div>
      Genre: {book.genre}
    </div>
    {#if book.read}
      <form method="POST" action="?/removeFromReadList" use:enhance>
        <input type="hidden" name="id" value={book._id} />
        <button class="btn btn-danger">Von Leseliste entfernen</button>
      </form>
    {/if}
    {#if !book.read}
      <form method="POST" action="?/addToReadList" use:enhance>
        <input type="hidden" name="id" value={book._id} />
        <button class="btn btn-success">Auf die Leseliste</button>
      </form>
    {/if}
  </div>
</div>

<style>
  .book-card {
    border: 1px solid #555;
    height: 100%;
    background-color: #444;
    color: white;
  }
  .details {
    padding: 0.5em;
  }
  .title {
    font-weight: bold;
  }
</style>
