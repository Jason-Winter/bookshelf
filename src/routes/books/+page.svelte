<script>
  import BookCard from "$lib/components/BookCard.svelte";
  let { data } = $props();


</script>

<div class="page-content">
  <h1>Bücher</h1>
  <div>
  <a href="/books/create" class="btn-custom">Buch hinzufügen</a>
</div>
<p><i>Daten und Bilder generiert mit ChatGPT und DALL-E</i></p>

<!-- See https://getbootstrap.com/docs/5.3/forms/checks-radios/ -->

<div class="row mt-3">
  {#each data.books as book}
    <div class="col-sm-6 col-md-4 col-lg-3 mb-2 gx-2">
      <BookCard {book}></BookCard>
    </div>
  {/each}
</div>
</div>

<style>
  

</style>
