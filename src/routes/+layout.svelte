<script>
  import "./styles.css";
  let { children } = $props();
</script>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light">
    <!-- Container wrapper -->
    <div class="container-fluid">
        <!-- Navbar brand -->
        <a class="navbar-brand" href="http://localhost:5173/">
            <img src="/BookShelf.svg" height="40" alt="" loading="lazy" />
        </a>

        <!-- Toggle button -->
        <button
            class="navbar-toggler"
            type="button"
            data-mdb-collapse-init
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <i class="fas fa-bars"></i>
        </button>

        <!-- Collapsible wrapper -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <!-- Left links -->
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" href="/books">Bücher</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/favoriten">Favoriten</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/rezensionen">Meine Rezensionen</a
                    >
                </li>
            </ul>
            <!-- Left links -->

            <!-- Search form -->
            <img
                src="/icons/account_circle.svg"
                alt="Account"
                class="account-icon"
            />
            <form class="search-form">
                <input
                    type="search"
                    class="search-input"
                    placeholder="Suchbegriff"
                    aria-label="Search"
                />
                <button class="search-button" type="submit" aria-label="Search">
                    <img
                        src="/icons/suche.svg"
                        alt="Suche"
                        class="search-icon"
                    />
                </button>
            </form>
        </div>
        <!-- Container wrapper -->
    </div>
</nav>

<div class="container mt-3">
  {@render children()}
</div>

<style>
  .navbar {
        z-index: 1030; /* Standardwert für Bootstrap */
    }
  .container {
        margin-top: 70px;
        position: relative; /* Höhe der Navbar (anpassen, falls nötig) */
    }
    .account-icon {
        width: 35px; /* Neue Größe des Icons */
        height: 35px;
        cursor: pointer;
    }
    /* Styling für die Suchleiste */
    .search-form {
        display: flex;
        align-items: center;
        background-color: rgba(
            0,
            0,
            0,
            0.1
        ); /* Halbtransparenter Hintergrund */
        border-radius: 25px; /* Abgerundete Ecken */
        padding: 5px 10px;
        width: 250px; /* Breite der Suchleiste */
        margin-left: 1rem;
    }

    .search-input {
        border: none;
        background: transparent;
        outline: none;
        flex: 1;
        padding: 5px;
        font-size: 16px;
    }

    .search-button {
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .search-icon {
        width: 25px; /* Größe des Icons */
        height: 25px;
    }

    .search-button:hover .search-icon {
        filter: brightness(1.2); /* Hellerer Effekt beim Hover */
    }
</style>