<script>
    let { data } = $props();
    let book = data.book;
    let stats = data.stats;
</script>

<div class="page-content">
    <h1>Willkommen bei BookShelf</h1>
    <p class="intro-text">
        Entdecke, sammle und bewerte deine Lieblingsbücher – alles an einem Ort.
        Mit BookShelf behältst du den Überblick über deine Lesereise, findest
        neue Empfehlungen und teilst deine Meinung mit anderen Lesern und
        Leserinnen. Starte jetzt und mach dein Bücherregal digital!
    </p>

    <h2 class="section-title">Statistiken</h2>
    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-icon">
                <i class="bi bi-book"></i>
            </div>
            <div class="stat-value">{stats.books}</div>
            <div class="stat-label">Bücher</div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">
                <i class="bi bi-chat-left-text"></i>
            </div>
            <div class="stat-value">{stats.reviews}</div>
            <div class="stat-label">Rezensionen</div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">
                <i class="bi bi-list-task"></i>
            </div>
            <div class="stat-value">{stats.readingLists}</div>
            <div class="stat-label">Leselisten</div>
        </div>
    </div>

    <h2 class="section-title">Buch des Tages</h2>
    <div class="detail-container">
        <div class="buch-cover">
            <a href={`/books/${book._id}`}>
                <img
                    src={book.cover || "/img/platzhalter.png"}
                    alt="Cover von {book.name}"
                    class="buch-cover-img"
                /></a
            >
        </div>
        <div class="buch-details">
            <h3 class="buch-title">
                {book.name} <span class="buch-jahr"></span>
            </h3>

            <p class="buch-beschreibung">
                {book.beschreibung || "Beschreibung nicht vorhanden"}
            </p>
            <div class="buch-meta">
                <div>
                    <p class="meta-label">Autor</p>
                    <p class="meta-value">{book.autor || "Autor unbekannt"}</p>
                </div>
                <div>
                    <p class="meta-label">Erscheinungsdatum</p>
                    <p class="meta-value">
                        {book.datum || "Erscheinungsdatum unbekannt"}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .intro-text {
        color: #ccc; /* Grauer Text */
        margin-top: 0.5rem;
    }
    .section-title {
        font-size: 2rem;
        margin-top: 3rem;
        color: white; /* Weißer Titel */
    }
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-top: 2rem;
    }

    .stat-card {
        background: white; /* Schwarzer Hintergrund */
        border: 2px solid #fff; /* Weißer Rahmen */
        border-radius: 12px;
        padding: 1.5rem;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        margin-bottom: 2rem;
    }

    .stat-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 10px rgba(255, 255, 255, 0.2); /* Weißer Schatten beim Hover */
    }

    .stat-icon {
        font-size: 3rem;
        color: black; /* Weiße Icons */
        margin-bottom: 0.5rem;
    }

    .stat-value {
        font-size: 2rem;
        font-weight: bold;
        color: black; /* Weißer Text */
    }

    .stat-label {
        font-size: 1rem;
        color: #525151; /* Grauer Text für Labels */
        margin-top: 0.5rem;
    }

    .detail-container {
        display: flex;
        gap: 2rem;
        margin-top: 2rem;
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
        font-size: 1.5rem;
        margin: 0;
    }

    .buch-jahr {
        font-size: 1.2rem;
        color: #aaa;
    }
</style>
