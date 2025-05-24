<script>
    let { data } = $props();
    let rezensionen = data.rezensionen;
</script>

<div class="page-content">
    <h1>Rezensionen</h1>
    {#if rezensionen.length > 0}
        {#each rezensionen as rez, index}
            <div class="rezension {index > 0 ? 'mit-trennlinie' : ''}">
                <div class="rezension-header">
                    <a href={`/books/${rez.book._id}`} class="buch-link">
                        <img src={rez.book.cover || "/img/platzhalter.png"} alt="Cover zu {rez.book.name || 'Unbekannt'}" class="buch-cover" /> </a>
                    <div class="rezension-details">
                        <p class="rezension-buch-titel"> Rezension zu {rez.book.name || "Unbekannt"} </p>
                        <p class="rezension-bewertung">
                            {#each Array(rez.bewertung).fill(0) as _}
                                 <i class="bi bi-star-fill"></i>
                            {/each}
                        </p>
                        <div class="rezension-text">
                            <p>{rez.text}</p>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    {:else}
        <p>Keine Rezensionen vorhanden.</p>
    {/if}
</div>

<style>
    .rezension {
        padding: 1rem;
        border-radius: 8px;
        background-color: #2c2c2c;
        margin-bottom: 1.5rem;
    }

    .rezension.mit-trennlinie {
        border-top: 1px solid #444;
        padding-top: 1.5rem;
    }

    .rezension-header {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .rezension-buch-titel {
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

    .buch-cover {
        width: 150px;
        height: 200px;
        border-radius: 4px;
        object-fit: cover;
        flex-shrink: 0;
    }
</style>
