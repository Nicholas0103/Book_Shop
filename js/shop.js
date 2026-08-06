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
                <p class="book-showcase-author">By ${book.author}</p>
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
    const { containerId, genreName, cardClass = "book-card" } = config;
    const container = document.getElementById(containerId);
    
    if (!container || typeof BooksData === "undefined") return;

    // Filter books for this genre once
    const books = BooksData.filter(book => book.subgenre === genreName);

    container.innerHTML = books.map(book => `
        <div class="${cardClass}-card">
            <a href="book.html?book=${book.id}" class="${cardClass}-cover-link">
                <img src="${book.cover}" alt="${book.title}" class="${cardClass}-cover">
            </a>
            <button class="buy-btn" data-book-id="${book.id}" onclick="addToCart(${book.id})">Add to Cart</button>
        </div>
    `).join("");

    updateCartButtons();
}

// 2. Configuration array for all your sections
const genreSections = [
    { containerId: "cozyGenreGrid", genreName: "Cozy Mystery", cardClass: "cozy-book" },
    { containerId: "bloodyGenreGrid", genreName: "Bloody Mystery", cardClass: "bloody-book" },
    { containerId: "supernaturalGenreGrid", genreName: "Supernatural Mystery", cardClass: "supernatural-book" },
    { containerId: "detectiveGenreGrid", genreName: "Classic Detective", cardClass: "detective-book" },
    { containerId: "kidGenreGrid", genreName: "YA & Kid Mystery", cardClass: "kid-book" },
    { containerId: "historicalGenreGrid", genreName: "Historical Mystery", cardClass: "historical-book" }
];

// 3. Single event listener to run them all at once
document.addEventListener("DOMContentLoaded", () => {
    genreSections.forEach(section => renderGenreSection(section));

    // 2. Read URL parameters (e.g., ?genre=cozy)
    const urlParams = new URLSearchParams(window.location.search);
    const selectedGenre = urlParams.get("genre");

    // 3. Scroll to the corresponding section if parameter exists
    if (selectedGenre) {
        // Map the parameter to your section IDs
        const sectionMap = {
            "cozy": "cozyGenre",
            "dark": "bloodyGenre",
            "supernatural": "supernaturalGenre",
            "classic": "detectiveGenre",
            "youngadult": "kidGenre",
            "historical": "historicalGenre"
            // Add other genre keys here as needed
        };

        const targetId = sectionMap[selectedGenre];
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Smoothly scroll to the target section
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    }
});