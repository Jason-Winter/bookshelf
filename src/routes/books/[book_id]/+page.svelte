<script>
  let { data } = $props();
  let averageRating = data.averageRating;
  let details = data.details;
</script>

<div class="page-content">
  <button class="btn-custom"><a href="/books">Zurück</a></button>
  <div class="detail-container">
    <div class="buch-cover">
      <img src={details[0].cover || "/img/platzhalter.png"} alt="Cover von {details[0].name}" class="buch-cover-img" />
    </div>
    <div class="buch-details">
      <h1 class="buch-title">
        {details[0].name} <span class="buch-jahr"></span>
      </h1>

      <div class="user-score-container">
        <div class="user-score">{averageRating}</div>
        <p class="user-score-label">Benutzer Bewertung</p>

        {#if details[0].isFavorited}
          <form method="POST" action="?/removeFavorite">
            <input type="hidden" name="id" value={details[0]._id} />
            <button class="favorite-icon-button" aria-label="Favorit entfernen"><i class="bi bi-heart-fill favorite-icon"></i> </button>
          </form>
        {/if}
        {#if !details[0].isFavorited}
          <form method="POST" action="?/addFavorite">
            <input type="hidden" name="id" value={details[0]._id} />
            <button class="favorite-icon-button" aria-label="Als Favorit markieren"><i class="bi bi-heart favorite-icon"></i> </button>
          </form>
        {/if}
      </div>

      <p class="buch-beschreibung"> {details[0].beschreibung || "Beschreibung nicht vorhanden"}</p>

      <div class="buch-meta">
        <div>
          <p class="meta-label">Autor</p>
          <p class="meta-value">{details[0].autor || "Autor unbekannt"}</p>
        </div>
        <div>
          <p class="meta-label">Erscheinungsdatum</p>
          <p class="meta-value"> {details[0].datum || "Erscheinungsdatum unbekannt"}</p>
        </div>
        <div class="delete-button-container">
          <button type="button" class="btn-custom" data-bs-toggle="modal" data-bs-target="#deleteModal"> Buch löschen</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteModalLabel">Buch löschen</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Bist du sicher, dass du dieses Buch löschen möchtest?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-custom" data-bs-dismiss="modal">Abbrechen</button>
        <form method="POST" action="?/delete" use:enhance>
          <input type="hidden" name="id" value={details[0]._id} />
          <button type="submit" class="btn-custom">Buch löschen</button>
        </form>
      </div>
    </div>
  </div>
</div>

<h2 class="rezension-title">Rezensionen</h2>
  {#if details[0].rezension.length > 0}
    <div class="rezensionen-container">
      {#each details[0].rezension as rez, index}
        <div class="rezension {index > 0 ? 'mit-trennlinie' : ''}">
          <div class="rezension-header">
            <img src={rez.benutzer[0]?.profilbild || "/img/default-avatar.png"} alt="Profilbild von {rez.benutzer[0]?.name || 'Unbekannt'}" class="profilbild" />
            <div>
              <p class="rezension-autor">
                Rezension von {rez.benutzer[0]?.name || "Unbekannt"}
              </p>
              <p class="rezension-bewertung">
                {#each Array(rez.bewertung).fill(0) as _}
                  <i class="bi bi-star-fill"></i>
                {/each}
              </p>
            </div>
          </div>
          <div class="rezension-text">
            <p>{rez.text}</p>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <p>Keine Rezensionen vorhanden.</p>
  {/if}
  <a href={`/books/${details[0]._id}/createRezension`} class="btn-custom">Rezension hinzufügen</a>
</div>

<style>
  .detail-container {
    display: flex;
    gap: 2rem;
    margin-top: 0.5rem;
    position: relative;
  }

  .buch-cover {
    flex-shrink: 0;
  }

  .buch-cover-img {
    width: 300px;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .buch-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .buch-beschreibung {
    font-size: 1rem;
    color: #ccc;
    line-height: 1.6;
    margin-top: 0.5rem;
  }

  .buch-meta {
    display: flex;
    gap: 8rem;
    margin-top: 1rem;
  }

  .meta-label {
    font-size: 0.9rem;
    color: #aaa;
  }

  .meta-value {
    font-size: 1rem;
    color: #fff;
  }

  .buch-title {
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
  }

  .buch-jahr {
    font-size: 1.2rem;
    color: #aaa;
  }

  .user-score-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 0.5rem; 
  }

  .user-score {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #222;
    color: #ffd700;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .user-score-label {
    font-size: 1rem;
    color: #ccc;
    margin-top: 1rem;
  }

  .buch-beschreibung {
    font-size: 1rem;
    color: #ccc;
  }

  .favorite-icon-button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  .favorite-icon {
    width: 24px;
    height: 24px;
    transition: transform 0.2s ease;
  }

  .favorite-icon:hover {
    transform: scale(1.2);
  }

  .delete-button-container {
    position: absolute;
    bottom: 0; 
  }

  .rezension-title {
    margin-top: 3rem;
  }
  .rezensionen-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .rezension {
    background-color: #1c1c1c;
    color: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .rezension.mit-trennlinie {
    border-top: 1px solid #444;
    padding-top: 1.5rem;
  }

  .rezension-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .profilbild {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }

  .rezension-autor {
    font-weight: bold;
    margin: 0;
  }

  .rezension-bewertung {
    color: #ffd700;
    margin: 0.2rem 0 0;
  }

   .rezension-bewertung i {
    color: #ffd700; 
    font-size: 1.2rem; 
    margin-right: 0.1rem; 
  }

  .rezension-text {
    margin: 1rem 0;
    line-height: 1.6;
  }

  .modal-dialog{
    background-color: black;
    color: white;
  }

    .modal-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }

  .modal-body p {
    font-size: 1rem;
    color: #555;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }

  .favorite-icon-button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  .favorite-icon {
    font-size: 1.5rem; 
    color: white; 
    transition: transform 0.2s ease;
  }

  .favorite-icon:hover {
    transform: scale(1.2); 
  }
</style>
