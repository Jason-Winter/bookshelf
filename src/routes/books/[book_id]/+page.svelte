<script>
    import { json } from '@sveltejs/kit';

  let { data } = $props();
  let book = data.book;
  let averageRating = data.averageRating;
  let rezensionen = data.rezensionen;
  let details = data.details;
  /*let user = data.benutzer;*/

</script>

<div class="page-content">
  <button class="btn-custom"><a href="/books">Zurück</a></button>
  <div class="detail-container">
    <div class="buch-cover">
      <img
        src={details[0].cover || "/img/platzhalter.png"}
        alt="Cover von {details[0].name}"
        class="buch-cover-img"
      />
    </div>
    <div class="buch-details">
      <h1 class="buch-title">
        {details[0].name} <span class="buch-jahr"></span>
      </h1>

      <!-- User Score und Favoriten-Button nebeneinander -->
      <div class="user-score-container">
        <div class="user-score">{averageRating}</div>
        <p class="user-score-label">Benutzer Bewertung</p>

        {#if details[0].isFavorited}
          <form method="POST" action="?/removeFavorite" use:enhance>
            <input type="hidden" name="id" value={details[0]._id} />
            <button class="favorite-icon-button"
              ><img
                src="/icons/favorite.svg"
                alt="Favoriten-Icon"
                class="favorite-icon"
              /></button
            >
          </form>
        {/if}
        {#if !details[0].isFavorited}
          <form method="POST" action="?/addFavorite" use:enhance>
            <input type="hidden" name="id" value={details[0]._id} />
            <button class="favorite-icon-button"
              ><img
                src="/icons/favorite_border.svg"
                alt="Favoriten-Icon"
                class="favorite-icon"
              /></button
            >
          </form>
        {/if}
      </div>

      <p class="buch-beschreibung">
        {details[0].beschreibung || "Beschreibung nicht vorhanden"}
      </p>

      <!-- Autor und Erscheinungsdatum -->
      <div class="buch-meta">
        <div>
          <p class="meta-label">Autor</p>
          <p class="meta-value">{details[0].autor || "Autor unbekannt"}</p>
        </div>
        <div>
          <p class="meta-label">Erscheinungsdatum</p>
          <p class="meta-value">
            {details[0].datum || "Erscheinungsdatum unbekannt"}
          </p>
        </div>
        <form method="POST" action="?/delete" class="delete-button-container">
          <input type="hidden" name="id" value={details[0]._id} />
          <button class="btn-custom">Buch löschen</button>
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
            <img
              src={rez.benutzer[0]?.profilbild || "/img/default-avatar.png"}
              alt="Profilbild von {rez.benutzer[0]?.name || 'Unbekannt'}"
              class="profilbild"
            />
            <div>
              <p class="rezension-autor">
                Rezension von {rez.benutzer[0]?.name || "Unbekannt"}
              </p>
              <p class="rezension-bewertung">
                {#each Array(rez.bewertung).fill(0) as _}
                  <span class="stern">★</span>
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
    margin-top: 0.5rem; /* Abstand zwischen Titel und User Score */
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
    bottom: 0; /* Positioniere den Button unten */
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

  .stern {
    font-size: 1.2rem;
  }

  .rezension-text {
    margin: 1rem 0;
    line-height: 1.6;
  }

</style>
