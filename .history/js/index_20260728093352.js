
/* ========================================
1. HIGH RATED BOOK LIST
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    renderHighRatedBooks();
});

function renderHighRatedBooks() {
    const track = document.getElementById("highRatedTrack");
    if (!track || typeof BooksData === "undefined") return;

    // The "..." is to copy the array from BooksData
    // b.rating - a.rating to sort rating from high to low
    // (0, 8) because we only want eight books in the main page
    const topBooks = [...BooksData]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8);

    track.innerHTML = topBooks.map(book => `
        <div class="book-card">
            <a href="book.html?book=${book.id}" class="book-cover-link">
                <img src="${book.cover}" alt="${book.title}" class="book-cover">
            </a>
            <button class="buy-btn">Buy</button>
        </div>
    `).join("");
}


/* ========================================
2. BOOK OF THE MONTH
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    renderBookOfTheMonth(13);
})

function renderBookOfTheMonth(featuredID) {
    const container = document.getElementById("featuredBookContainer");
    if (!container || typeof BooksData === "undefined") return;

    const book = BooksData.find(b => b.id === featuredID);

    if (book) {
        container.innerHTML = `
        <a href="book.html?book=${book.id}" class="book-month-cover-link">
            <img src="${book.cover}" class="book-month-img" alt="${book.title}">
        </a>
        <div class="book-month-text">
            <h3 class="book-month-title">${book.title}</h3>
            <p class="book-month-author">By ${book.author}</p>
            <p class="book-month-details">${book.description}</p>
            <div class="book-month-action">
                <span class="book-month-price">${book.price}</span>
                <a href="book.html?book=${book.id}" class="buy-btn">Add to Cart</a>
            </div>
        </div>
        `;
    }
}

/* ========================================
1. HIGH RATED BOOK LIST
======================================== */

let cart = JSON.parse(localStorage.getItem("bookCart")) || [];

document.addEventListener("DOMContentLoaded", () => {
    updateCartUI();

    document.getElementById("closeCartBtn")?.addEventListener("click", closeCart);
    document.getElementById("cartOverlay")?.addEventListener("click", closeCart);
});

function addToCart(bookId) {
    const book = BooksData.find(b => b.id === bookId)
}