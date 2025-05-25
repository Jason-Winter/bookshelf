<script>
  let { form, data } = $props();
  let books = data.books;
  let selectedBooks = $state([]);

    function toggleBookSelection(buch_id) {
    if (selectedBooks.includes(buch_id)) {
      selectedBooks = selectedBooks.filter(id => id !== buch_id);
    } else {
      selectedBooks = [...selectedBooks, buch_id];
    }

  }

</script>

<div class="page-content">
<button class="btn-custom"><a href="/readinglists">Zurück</a></button>
<h1>Neues Leseliste erstellen</h1>
<form method="POST" action="?/create">
  <div class="mb-3">
    <label for="" class="form-label">Name</label>
    <input name="name" class="form-control" type="text" required />
  </div>
  <div class="mb-3">
    <label for="" class="form-label">Beschreibung</label>
    <input name="beschreibung" class="form-control" type="text" required />
  </div>
    <div class="mb-3">
      <label for="" class="form-label">Bücher</label>
      <div class="checkbox-list">
        {#each books as book}
          <div class="checkbox-item">
            <input type="checkbox" id={book.buch_id} value={book.buch_id} onchange={() => toggleBookSelection(book.buch_id)} />
            <label for={book.buch_id}>{book.name}</label>
          </div>
        {/each}
      </div>
      <input type="hidden" name="buecher" bind:value={selectedBooks} />
    </div>
  <button type="submit" class="btn-custom">Leseliste hinzufügen</button>
</form>

{#if form?.success}
  <p>Leseliste erstellt</p>
{/if}
</div>