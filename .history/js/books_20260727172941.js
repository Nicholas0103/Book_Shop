
const BooksData = [
    {
        id: 1,
        title: "Detection Unlimited",
        author: "Georgette Heyer", 
        cover: "/assets/book/book_1.jpg", 
        rating: 3.8,
        subgenre: "subgenre 3",
        published_year: "1971",
        price: "$8.39",
    },
    {
        id: 2,
        title: "The Mysterious Island",
        author: "Jules Verne", 
        cover: "/assets/book/book_2.jpg", 
        rating: 3.9,
        subgenre: "subgenre 2",
        published_year: "1977",
        price: "9.99",
    },
    {
        id: 3,
        title: "Sherlock Holmes",
        author: "Conan Doyle", 
        cover: "/assets/book/book_3.jpg", 
        rating: 4.8,
        subgenre: "subgenre 1",
        published_year: "1924",
        price: "$15.99",
    },
    {
        id: 4,
        title: "The Mystery of the Blue Train",
        author: "Agatha Christie", 
        cover: "/assets/book/book_4.png", 
        rating: 4.1,
        subgenre: "subgenre 1",
        published_year: "2024",
        price: "$15.99",
    },
    {
        id: 5,
        title: "Murder in Three Acts",
        author: "Agatha Christie", 
        cover: "/assets/book/book_5.png", 
        rating: 3.7,
        subgenre: "subgenre 2",
        published_year: "1984",
        price: "$7.40",
    },
    {
        id: 6,
        title: "The Mysterious Cargo",
        author: "Galila Ben-Uri", 
        cover: "/assets/book/book_6.png", 
        rating: 3.2,
        subgenre: "subgenre 2",
        published_year: "1989",
        price: "$19.40",
    },
    {
        id: 7,
        title: "The Mystery of the Green Ghost",
        author: "Robert Arthur", 
        cover: "/assets/book/book_7.png", 
        rating: 4.0,
        subgenre: "subgenre 4",
        published_year: "1980",
        price: "$9.20",
    },
    {
        id: 8,
        title: "Emil and the Detectives",
        author: "Erich Kästner", 
        cover: "/assets/book/book_8.png", 
        rating: 4.2,
        subgenre: "subgenre 4",
        published_year: "1930",
        price: "$5.30",
    },
]

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("book-details-container");

    // 1. Get the book ID from the URL (e.g., "?book=6")
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get("book");

    // 2. Find the book in your BooksData array (using loose equality for string vs number comparison)
    const selectedBook = BooksData.find(book => book.id == bookId);

    // 3. Render the details or show an error if not found
    if (selectedBook) {
        container.innerHTML = `
            <div class="detail-cover-container">
                <img src="${selectedBook.cover}" alt="${selectedBook.title}" class="detail-cover">
            </div>
            <div class="detail-info">
                <div>
                    <h1 class="detail-title">${selectedBook.title}</h1>
                    <p class="detail-author">By ${selectedBook.author}</p>
                    
                    <div class="detail-metadata">
                        <span class="badge">⭐ ${selectedBook.rating} / 5.0</span>
                        <span class="badge">📁 ${selectedBook.subgenre}</span>
                        <span class="badge">📅 Published: ${selectedBook.published_year}</span>
                    </div>
                </div>

                <div class="detail-price-row">
                    <span class="detail-price">${selectedBook.price}</span>
                    <button class="buy-btn">Acquire Case File</button>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="not-found-message">
                <h2>🔍 Clue Not Found</h2>
                <p>We couldn't find details for the requested book (ID: ${bookId || 'None'}).</p>
                <a href="catalog.html" class="buy-btn" style="display: inline-block; margin-top: 15px; text-decoration: none;">Return to Catalog</a>
            </div>
        `;
    }
});