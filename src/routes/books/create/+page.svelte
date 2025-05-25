<script>
  let { form } = $props();
</script>

<div class="page-content">
<button class="btn-custom"><a href="/books">Zurück</a></button>
<h1>Neues Buch hinzufügen</h1>
<form method="POST" action="?/create">
  <div class="mb-3">
    <label for="" class="form-label">Name</label>
    <input name="name" class="form-control" type="text" required />
  </div>
  <div class="mb-3">
    <label for="" class="form-label">Erscheinungsdatum</label>
    <input name="datum" class="form-control" type="date" required />
  </div>
  <div class="mb-3">
    <label for="" class="form-label">Genre</label>
    <input name="genre" class="form-control" type="text" required />
  </div>
   <div class="mb-3">
    <label for="" class="form-label">Autor</label>
    <input name="autor" class="form-control" type="text" required />
  </div>
   <div class="mb-3">
    <label for="" class="form-label">Beschreibung</label>
    <input name="beschreibung" class="form-control" type="text" required />
  </div>
  <button type="submit" class="btn-custom">Buch hinzufügen</button>
</form>

{#if form?.success}  
  <p>Buch erstellt</p>
{/if}
{#if form?.error}  
  <p>{form.error}</p>
{/if}
</div>
