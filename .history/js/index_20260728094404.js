
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
3. CART DRAWER
======================================== */

let cart = JSON.parse(localStorage.getItem("bookCart")) || [];

document.addEventListener("DOMContentLoaded", () => {
    updateCartUI();

    document.getElementById("closeCartBtn")?.addEventListener("click", closeCart);
    document.getElementById("cartOverlay")?.addEventListener("click", closeCart);
});

function addToCart(bookId) {
    const book = BooksData.find(b => b.id === bookId);
    if(!book) return;

    cart.push(book);
    localStorage.setItem("bookCart", JSON.stringify(cart));

    updateCartUI();
    openCart();
}

function openCart() {
    document.getElementById("cartDrawer")?.classList.add("open");
    document.getElementById("cartOverlay")?.classList.add("active");
}

function closeCart() {
    document.getElementById("cartDrawer")?.classList.remove("open");
    document.getElementById("cartOverlay")?.classList.remove("active");
}

function updateCartUI() {
    const container = document.getElementById("cartItemsContainer");
    const countEl = document.getElementById("cartCount");
    const subtotalEl = document.getElementById("cartSubtotal");

    if(!container) return;

    countEl.textContent = cart.length;

    if (cart.length === 0) {
        container.innerHTML = `<p class="empty-cart-msg">Your cart is empty.</p>`;
        subtotalEl.textContent = "$0.00";
        return;
    }
    let total = 0;
    container.innerHTML = cart.map((item, index) => {
        const priceNum = parseFloat(item.price.replace("$", ""));
        total += priceNum;

        return `
            <div class="cart-item">
                <div>
                    <strong>${item.title}</strong>
                    <div style="font-size:0.85rem; opacity:0.7;">${item.price}</div>
                </div>
                <button onclick="removeFromCart(${index})" style="background:none; border:none; color:#ff4d4d; cursor:pointer;">✕</button>
            </div>
        `;
    }).join("");

    subtotalEl.textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("bookCart", JSON.stringify(cart));
    updateCartUI();
}