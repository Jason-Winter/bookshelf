<script>
  let { form, data } = $props();
  let book = data.book;
</script>

<div class="page-content">
<button class="btn-custom"><a href="/books">Zurück</a></button>
<h1>Neue Rezension hinzufügen</h1>
<form method="POST" action="?/create">
  <input type="hidden" name="buch_id" value={book.buch_id} />
    <div class="mb-3">
      <label for="" class="form-label">Buchname</label>
      <input name="buch_name" class="form-control" type="text" value={book.name} readonly />
    </div>
  <div class="mb-3">
    <label for="" class="form-label">Bewertung</label>
    <input name="bewertung" class="form-control" type="number" min="1" max="5" required />
  </div>
  <div class="mb-3">
    <label for="" class="form-label">Rezension</label>
    <input name="text" class="form-control" type="text" required />
  </div>
  <button type="submit" class="btn-custom">Rezension hinzufügen</button>
</form>

{#if form?.success}
  <p>Rezension erstellt</p>
{/if}
</div>
