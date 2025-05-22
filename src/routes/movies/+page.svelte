<script>
  import BookCard from "$lib/components/BookCard.svelte";
  let { data } = $props();

  let filterByReadList = $state(false);

  let books = $derived.by(() => {
    if (filterByReadList) {
      let booksFiltered = data.books.filter(
        (book) => book.read === true,
      );
      return booksFiltered;
    }
    return data.books;
  });
</script>

<p><i>Daten und Bilder generiert mit ChatGPT und DALL-E</i></p>
<div>
  <a href="/books/create" class="btn btn-primary">Add New Book</a>
</div>
<!-- See https://getbootstrap.com/docs/5.3/forms/checks-radios/ -->
<div class="form-check mt-3">
  <input
    class="form-check-input"
    type="checkbox"
    bind:checked={filterByReadList}
    id="filter"
  />
  <label class="form-check-label" for="filter">
    Show only books on read list
  </label>
</div>
<div class="row mt-3">
  {#each books as book}
    <div class="col-sm-6 col-md-4 col-lg-3 mb-2 gx-2">
      <BookCard {book}></BookCard>
    </div>
  {/each}
</div>
