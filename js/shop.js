/* ========================================
1. BOOK SHOWCASE
======================================== */

let showcaseBookId = Math.floor(Math.random() * 24) + 1; // Default book ID for the showcase

document.addEventListener("DOMContentLoaded", () => {
    renderBookShowcase(showcaseBookId);
})

function renderBookShowcase(bookId) {
    const showcaseContainer = document.getElementById("bookShowcaseGrid");
    if (!showcaseContainer || typeof BooksData === "undefined") return;

    const book = BooksData.find(book => book.id === bookId);

    if (book) {
        showcaseContainer.innerHTML = `
            <div class="book-showcase-info">
                <h3 class="book-showcase-title">${book.title}</h3>
                <p class="book-showcase-author">By <span>${book.author}</span></p>
                <p class="book-showcase-description">${book.description}</p>
            </div>
            <a class="book-showcase-cover" href="book.html?book=${book.id}">
                <img src="${book.cover}" alt="${book.title}" class="book-showcase-img">
            </a>
        `;
    }
}

/* ========================================
3. COZY CORNER
======================================== */

// document.addEventListener("DOMContentLoaded", () => {
//     renderCozyCorner();
// })

// function renderCozyCorner() {
//     const cozyContainer = document.getElementById("cozyGenreGrid");
//     if (!cozyContainer || typeof BooksData === "undefined") return;

//     const totalCozy = getGenreCount("Cozy Mystery");
//     const cozyBooks = BooksData.filter(book => book.subgenre === "Cozy Mystery").slice(0, totalCozy);

//     cozyContainer.innerHTML = cozyBooks.map(book => `
//         <div class="cozy-book-card">
//             <a href="book.html?book=${book.id}" class="cozy-book-cover-link">
//                 <img src="${book.cover}" alt="${book.title}" class="cozy-book-cover">
//             </a>
//             <button class="buy-btn" data-book-id="${book.id}" onclick="addToCart(${book.id})">Add to Cart</button>
//         </div>
//     `).join("");

//     updateCartButtons();
// }


/* ========================================
3. GENRE CORNER
======================================== */

function renderGenreSection(config) {
    const { containerId, genreName } = config;
    const container = document.getElementById(containerId);
    
    if (!container || typeof BooksData === "undefined") return;

    const books = BooksData.filter(book => book.subgenre === genreName);

    container.innerHTML = books.map(book => `
        <div class="shop-card">
            <a href="book.html?book=${book.id}" class="cover-wrapper">
                <img src="${book.cover}" alt="${book.title}" class="cover-img">
            </a>
            <div class="card-details">
                <a href="book.html?book=${book.id}" class="book-title-link">
                    <h3 class="book-title">${book.title}</h3>
                </a>
                <p class="book-author">${book.author}</p>
                <div class="stars-container">${renderStars(book.rating)}</div>
                <div class="book-card-footer">
                    <span class="book-price">${book.price}</span>
                    <button class="buy-btn" data-book-id="${book.id}" onclick="addToCart(${book.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join("");

    if (typeof updateCartButtons === "function") updateCartButtons();
}

const genreSections = [
    { containerId: "cozyGenreGrid", genreName: "Cozy Mystery" },
    { containerId: "bloodyGenreGrid", genreName: "Dark Mystery" },
    { containerId: "supernaturalGenreGrid", genreName: "Supernatural Mystery" },
    { containerId: "detectiveGenreGrid", genreName: "Classic Detective" },
    { containerId: "kidGenreGrid", genreName: "YA & Kid Mystery" },
    { containerId: "historicalGenreGrid", genreName: "Historical Mystery" }
];

document.addEventListener("DOMContentLoaded", () => {
    genreSections.forEach(section => renderGenreSection(section));

    const urlParams = new URLSearchParams(window.location.search);
    const selectedGenre = urlParams.get("genre");

    if (selectedGenre) {
        const sectionMap = {
            "cozy": "cozyGenre",
            "dark": "bloodyGenre",
            "supernatural": "supernaturalGenre",
            "classic": "detectiveGenre",
            "youngadult": "kidGenre",
            "historical": "historicalGenre"
        };

        const targetElement = document.getElementById(sectionMap[selectedGenre]);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    }
});