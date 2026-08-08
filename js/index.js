/* ========================================
1. FEATURED BOOK LIST
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    renderFeaturedBooks();
});

function renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    let stars = '';
    
    for (let i = 1; i <= 5; i++) {
        if (i <= full) {
            stars += '<span class="star full">★</span>';
        } else if (i === full + 1 && half) {
            // Half star created by stacking full star (50% width) over empty star
            stars += `<span class="star half-container">
                        <span class="star empty">★</span>
                        <span class="star half-filled">★</span>
                      </span>`;
        } else {
            stars += '<span class="star empty">★</span>';
        }
    }
    return `${stars} <span class="rating-num">(${rating.toFixed(1)})</span>`;
}
function renderFeaturedBooks() {
    const track = document.getElementById("sliderTrack");
    if (!track || typeof BooksData === "undefined") return;

    //const selectedIds = [3, 7, 14, 15, 13, 8, 2, 10];
    const selectedIds = [17, 18, 9, 20, 21, 22, 23, 24];

    const customBooks = selectedIds
        .map(id => BooksData.find(book => book.id === id))
        .filter(book => book !== undefined);

    track.innerHTML = customBooks.map(book => `
        <div class="book-card">
            <a href="book.html?book=${book.id}" class="book-cover-link">
                <img src="${book.cover}" alt="${book.title}" class="book-cover">
            </a>
            
            <div class="book-details-info">
            <div class="book-details">
                <p class="book-title">${book.title}</p>
                <p class="book-author">${book.author}</p>
                <hr>
                <p class="book-price">${book.price}</p>
            </div>
            <p class="book-rating">${renderStars(book.rating)}</p>
            </div>

            <button class="buy-btn" data-book-id="${book.id}" onclick="addToCart(${book.id})">Add to Cart</button>  
        </div>
        
    `).join("");

    updateCartButtons();
}


/* ========================================
2. HIGH RATED BOOK LIST
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
            <div class="book-details-info">
                <div class="book-details">
                    <p class="book-title">${book.title}</p>
                    <p class="book-author">${book.author}</p>
                    <hr>
                    <p class="book-price">${book.price}</p>
                </div>
                <p class="book-rating">${renderStars(book.rating)}</p>
            </div>
            <button class="buy-btn" data-book-id="${book.id}" onclick="addToCart(${book.id})">Add to Cart</button>  
        </div>
    `).join("");

    updateCartButtons();
}


/* ========================================
3. BOOK OF THE MONTH
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
                <button class="buy-btn" data-book-id="${book.id}" onclick="addToCart(${book.id})">Add to Cart</button>
            </div>
        </div>
        `;
        updateCartButtons();
    }
}