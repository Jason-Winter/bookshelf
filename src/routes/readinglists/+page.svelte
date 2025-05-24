<script>
    let { data } = $props();
    let readingLists = data.readingLists;
</script>

<div class="page-content">
    <h1>Leselisten</h1>
    {#if readingLists.length > 0}
        {#each readingLists as list, index}
            <div class="leseliste {index > 0 ? 'mit-trennlinie' : ''}">
                <div class="leseliste-header">
                    <div class="buch-link">
                        <img src={list.benutzer.profilbild || "/img/default-avatar.png"} alt="Profilbild von {list.benutzer.name || 'Unbekannt'}" class="profilbild" />
                    </div>
                    <div class="leseliste-details">
                        <a href={`/readinglists/${list._id}`} class="leseliste-buch-titel"> {list.name || "Unbekannt"} </a>
                        <div class="leseliste-text">
                            <p>{list.beschreibung}</p>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    {:else}
        <p>Keine Leselisten vorhanden.</p>
    {/if}
    <a href="/readinglists/createLeseliste" class="btn-custom">Leseliste erstellen</a>
</div>



<style>
    a {
        color: white;
    }
    .leseliste {
        padding: 1rem;
        border-radius: 8px;
        background-color: #2c2c2c;
        margin-bottom: 1.5rem;
    }

    .leseliste.mit-trennlinie {
        border-top: 1px solid #444;
        padding-top: 1.5rem;
    }

    .leseliste-header {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 0.5rem;
    }

    .leseliste-buch-titel {
        font-weight: bold;
        margin: 0;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }
    .leseliste-text {
        font-size: 0.9rem;
        color: #ccc;
        margin-top: 0.4rem;
    }

    .profilbild {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
    }
</style>
