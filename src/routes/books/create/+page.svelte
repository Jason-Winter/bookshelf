<script>
  let { form } = $props();
</script>

<div class="page-content">
<a href="/books">Back</a>
<h1>Add a Book</h1>
<form method="POST" action="?/create">
  <div class="mb-3">
    <label for="" class="form-label">Name</label>
    <input name="name" class="form-control" type="text" />
  </div>
  <div class="mb-3">
    <label for="" class="form-label">Erscheinungsdatum</label>
    <input name="erscheinungsdatum" class="form-control" type="date" />
  </div>
  <div class="mb-3">
    <label for="" class="form-label">Genre</label>
    <input name="genre" class="form-control" type="text" />
  </div>
  <button type="submit" class="btn btn-primary">Add Book</button>
</form>

{#if form?.success}
  <p>Book created</p>
{/if}
</div>
