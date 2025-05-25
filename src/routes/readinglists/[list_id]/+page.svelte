<script>
    import BookCard from "$lib/components/BookCard.svelte";
    import { json } from '@sveltejs/kit';

  let { data } = $props();
  let readingList = data.readingList;
  let books = data.books;

</script>

<div class="page-content">
  <h1>Leselisten</h1>

  
  <div class="book-list">
    {#each readingList.buch_ids as buch_id}
      {#each books.filter(book => book.buch_id === buch_id) as book}
        <BookCard {book} />
      {/each}
    {/each}
  </div>
</div>

<style>
  .book-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }
</style>