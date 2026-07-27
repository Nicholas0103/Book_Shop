
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

    tracker.innerHTML = topBooks.map(book => `
        <div class="book-card">
            <a href="book.html?book=${book.id}" class="book-cover-link">
                <img src="${book.cover}" alt="${book.title}" class="book-cover">
            </a>
            <button class="buy-btn">Buy</button>
        </div>
        `).join("");
}