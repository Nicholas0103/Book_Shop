
document.addEventListener("DOMContentLoaded", () => {
    renderHighRatedBooks();
});

function renderHighRatedBooks() {
    const track = document.getElementById("highRatedTrack");
    if (!track || typeof BooksData === "undefined") return;

    const topBooks = [...BooksData]
        .sort(a, b) => b.rating - a.rating)
        .slice(0, 8);
}
<div class="book-card">
    <a href="book.html?book=1" class="book-cover-link">
        <img src="/assets/book/book_1.jpg" alt="The Locked Study Mystery" class="book-cover">
    </a>
    <button class="buy-btn">Buy</button>
</div>