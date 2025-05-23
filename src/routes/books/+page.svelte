<script>
  import BookCard from "$lib/components/BookCard.svelte";
  let { data } = $props();


</script>

<div class="page-content">
  <div>
  <a href="/books/create" class="btn-custom">Add New Book</a>
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
  .btn-custom {
    display: inline-block;
    padding: 10px 20px;
    background-color: #070707; /* Dunkles Blau */
    color: white;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
    border-radius: 25px; /* Abgerundete Ecken */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Schatten */
    transition: all 0.3s ease; /* Weicher Übergang */
    border: 3px solid #fafafa; /* Dunkles Blau */
    margin-bottom: 1rem; /* Abstand nach unten */
  }

  .btn-custom:hover {
    background-color: #fcfdfd; /* Etwas dunkleres Blau beim Hover */
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3); /* Stärkerer Schatten beim Hover */
    transform: translateY(-2px); /* Leichtes Anheben beim Hover */
    color: #070707;
  }

  .btn-custom:active {
    background-color: #003f7f; /* Noch dunkler beim Klicken */
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2); /* Weniger Schatten beim Klicken */
    transform: translateY(0); /* Zurücksetzen der Position */
  }
</style>
