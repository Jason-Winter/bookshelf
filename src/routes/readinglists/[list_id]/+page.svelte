<script>
    import BookCard from "$lib/components/BookCard.svelte";
    import { json } from '@sveltejs/kit';

  let { data } = $props();
  let readingList = data.readingList;

</script>

<div class="page-content">
  <h1>Leselisten</h1>

  
  <div class="book-list">
    {#each data.books as book}
    {#if readingList.some(item => item.buch_id === book.buch_id)}
      <BookCard {book} />
    {/if}
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