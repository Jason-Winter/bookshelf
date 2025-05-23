<script>
  import BookCard from "$lib/components/BookCard.svelte";
  let { data } = $props();

    let filterByReadList = $state(false);

  let books = $derived.by(() => {
    if (filterByReadList) {
      let booksFiltered = data.books.filter(
        (book) => book.isFavorited === true,
      );
      return booksFiltered;
    }
    return data.books;
  });
</script>

<h1>Favoriten</h1>

<div class="book-list">
  {#each readList as book}
    <BookCard {book} />
  {/each}
</div>

<style>
  .book-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
</style>