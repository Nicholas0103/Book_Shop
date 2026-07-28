function revealAnimation() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    reveals.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        if (itemTop < windowHeight - revealPoint) {
            item.classList.add('active');
        }
    });
}

function navScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.top-bar a');
    const headerOffset = 120; 

    let currentSection = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerOffset;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', () => {
    revealAnimation();
    navScrollSpy();
});
window.addEventListener('load', () => {
    revealAnimation();
    navScrollSpy();
});

document.addEventListener("DOMContentLoaded", () => {
    
    const sliders = document.querySelectorAll(".slider-wrapper");
    const scrollAmount = 200; 

    sliders.forEach(slider => {
        const track = slider.querySelector(".slider-track");
        const prevBtn = slider.querySelector(".left-arrow");
        const nextBtn = slider.querySelector(".right-arrow");

        if (nextBtn && track) {
            nextBtn.addEventListener("click", () => {
                track.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth"
                });
            });
        }

        if (prevBtn && track) {
            prevBtn.addEventListener("click", () => {
                track.scrollBy({
                    left: -scrollAmount,
                    behavior: "smooth"
                });
            });
        }
    });

    
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

                    <p class=
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