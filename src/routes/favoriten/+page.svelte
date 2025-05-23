<script>
  import BookCard from "$lib/components/BookCard.svelte";
  let { data } = $props();

   let showFavorite = data.showFavorite;

</script>

<div class="page-content">
  <h1>Favoriten</h1>

  <div class="book-list">
    {#each showFavorite as book}
      <BookCard {book} />
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