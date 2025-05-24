<script>
    import "./styles.css";
    import { page } from "$app/stores";

    let { children } = $props();
</script>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">
            <img src="/BookShelf.svg" height="40" alt="" loading="lazy" />
        </a>

        <button class="navbar-toggler" type="button" data-mdb-collapse-init data-mdb-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fas fa-bars"></i>
        </button>

        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link {$page.url.pathname.startsWith('/books') ? 'active' : ''}" href="/books"> Bücher </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link {$page.url.pathname.startsWith('/favoriten') ? 'active' : ''}" href="/favoriten"> Favoriten </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link {$page.url.pathname.startsWith('/rezensionen') ? 'active' : ''}" href="/rezensionen"> Rezensionen </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link {$page.url.pathname.startsWith('/readinglists') ? 'active' : ''}" href="/readinglists"> Leselisten </a>
                </li>
            </ul>

            <i class="bi bi-person-circle account-icon"></i>

            <form class="search-form">
                <input type="search" class="search-input" placeholder="Suchbegriff" aria-label="Search" />
                <button class="search-button" type="submit" aria-label="Search">
                    <i class="bi bi-search search-icon"></i>
                </button>
            </form>
        </div>
    </div>
</nav>

<div class="container mt-3">
    {@render children()}
</div>

<style>
    .navbar {
        z-index: 1030;
    }
    .container {
        margin-top: 70px;
        position: relative;
    }

    .search-form {
        display: flex;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 25px;
        padding: 5px 10px;
        width: 250px;
        margin-left: 1rem;
    }
    .account-icon {
        font-size: 35px;
        cursor: pointer;
        color: black;
    }

    .search-icon {
        font-size: 25px;
        color: black;
        border: none;
        outline: none;
        box-shadow: none;
    }

    .search-button {
        border: none;
        outline: none;
        background: transparent;
        box-shadow: none;
    }

    .search-button:hover .search-icon {
        filter: brightness(1.2);
    }

    .search-input {
        border: none;
        background: transparent;
        outline: none;
        flex: 1;
        padding: 5px;
        font-size: 16px;
    }

    .nav-link.active {
        background-color: black;
        color: white;
        border-radius: 50px;
        font-weight: bold;
        padding: 8px 12px;
    }
</style>
