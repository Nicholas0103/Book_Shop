/* ========================================
1. CART DRAWER DISPLAY
======================================== */

let cart = JSON.parse(localStorage.getItem("bookCart")) || [];

function saveCart() {
    localStorage.setItem("bookCart", JSON.stringify(cart));
}

function syncCartState() {
    try {
        const storedCart = JSON.parse(localStorage.getItem("bookCart") || "[]");
        if (Array.isArray(storedCart)) {
            cart = storedCart;
        }
    } catch (error) {
        console.warn("Unable to restore cart from storage:", error);
        cart = [];
    }

    updateCartUI();
    updateCartButtons();
}

function isBookInCart(bookId) {
    return cart.some(item => String(item.id) === String(bookId));
}

function updateCartButtons() {
    document.querySelectorAll(".buy-btn[data-book-id]").forEach((button) => {
        const bookId = button.getAttribute("data-book-id");
        if (!bookId) return;

        const inCart = isBookInCart(bookId);
        button.classList.toggle("in-cart", inCart);
        button.textContent = inCart ? "In Cart" : "Add to Cart";
        button.setAttribute("aria-label", inCart ? "Book is already in your cart" : "Add to cart");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    syncCartState();

    document.getElementById("openCartBtn")?.addEventListener("click", openCart);

    document.getElementById("closeCartBtn")?.addEventListener("click", closeCart);
    document.getElementById("cartOverlay")?.addEventListener("click", closeCart);

    document.getElementById("checkoutBtn")?.addEventListener("click", handleCheckout);
    document.getElementById("closeModalBtn")?.addEventListener("click", closeModalAndClear);
});

window.addEventListener("pageshow", syncCartState);
window.addEventListener("storage", (event) => {
    if (event.key === "bookCart") {
        syncCartState();
    }
});

function addToCart(bookId) {
    const book = BooksData.find(b => b.id === bookId);
    if (!book) return;

    if (isBookInCart(bookId)) {
        updateCartUI();
        updateCartButtons();
        openCart();
        return;
    }

    cart.push({ ...book });
    saveCart();

    syncCartState();
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
    const headerCountEl = document.getElementById("headerCartCount");
    const subtotalEl = document.getElementById("cartSubtotal");

    if (!container) return;

    // Update count badges
    if (countEl) countEl.textContent = cart.length;
    if (headerCountEl) headerCountEl.textContent = cart.length;

    if (cart.length === 0) {
        container.innerHTML = `<p class="empty-cart-msg">Your cart is empty.</p>`;
        if (subtotalEl) subtotalEl.textContent = "$0.00";
        return;
    }

    let total = 0;
    container.innerHTML = cart.map((item) => {
        const priceNum = parseFloat(item.price.replace("$", ""));
        total += priceNum;

        return `
            <div class="cart-item-list">
                <div>
                    <p class="item-title">${item.title}</p>
                    <p class="item-price">${item.price}</p>
                </div>
                <button onclick="removeFromCart(${item.id})" class="remove-cart">✕</button>
            </div>
        `;
    }).join("");

    if (subtotalEl) subtotalEl.textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(bookId) {
    const itemIndex = cart.findIndex(item => String(item.id) === String(bookId));
    if (itemIndex === -1) return;

    cart.splice(itemIndex, 1);
    saveCart();
    syncCartState();
}

function handleCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Add a book before checking out.");
        return;
    }

    // 1. Calculate final subtotal
    const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace("$", "")), 0);

    // 2. Generate a random fake Order ID
    const randomOrderId = `#${Math.floor(10000 + Math.random() * 90000)}`;

    // 3. Inject details into modal
    document.getElementById("modalOrderId").textContent = randomOrderId;
    document.getElementById("modalTotal").textContent = `$${total.toFixed(2)}`;

    // 4. Close cart drawer and open success modal
    closeCart();
    document.getElementById("checkoutModal")?.classList.add("active");
}

function closeModalAndClear() {
    // 1. Hide modal
    document.getElementById("checkoutModal")?.classList.remove("active");

    // 2. Empty the cart array and clear localStorage
    cart = [];
    localStorage.removeItem("bookCart");

    // 3. Refresh cart UI display
    syncCartState();
}

/* ========================================
2. REVEAL ANIMATION
======================================== */

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

/* ========================================
3. DROPDOWN MENU
======================================== */

document.addEventListener('DOMContentLoaded', () => {
  const dropdownLi = document.querySelector('.top-bar li.dropdown');
  const toggleBtn = document.getElementById('categoriesToggle');

  // Open dropdown menu
  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dropdownLi.classList.toggle('open');
  });

  // Automatically close the menu if the user clicks outside of it
  document.addEventListener('click', (e) => {
    if (!dropdownLi.contains(e.target)) {
      dropdownLi.classList.remove('open');
    }
  });
});


/*function navScrollSpy() {
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
}*/

/* ========================================
4. LEFT & RIGHT ARROW
======================================== */

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


/* ========================================
5. BOOK DETAILS
======================================== */

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

                    <p class="details-description">${selectedBook.description}</p>
                </div>

                <div class="detail-price-row">
                    <span class="detail-price">${selectedBook.price}</span>
                    <button class="buy-btn" data-book-id="${selectedBook.id}" onclick="addToCart(${selectedBook.id})">Add to Cart</button>
                </div>
            </div>
        `;
        updateCartButtons();
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

/* ========================================
6. MOBILE MENU DRAWER
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const closeMobileMenuBtn = document.getElementById("closeMobileMenuBtn");
    const mobileMenuDrawer = document.getElementById("mobileMenuDrawer");
    const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
    const mobileMenuLinks = document.querySelectorAll(".mobile-menu-nav a");
    const mobileCategoriesToggle = document.querySelector(".mobile-categories-toggle");

    // Open mobile menu
    mobileMenuBtn?.addEventListener("click", () => {
        mobileMenuDrawer?.classList.add("open");
        mobileMenuOverlay?.classList.add("active");
    });

    // Close mobile menu
    function closeMobileMenu() {
        mobileMenuDrawer?.classList.remove("open");
        mobileMenuOverlay?.classList.remove("active");
    }

    closeMobileMenuBtn?.addEventListener("click", closeMobileMenu);
    mobileMenuOverlay?.addEventListener("click", closeMobileMenu);

    // Close menu when clicking on a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            // Don't close if it's the categories toggle
            if (!link.classList.contains("mobile-categories-toggle")) {
                closeMobileMenu();
            }
        });
    });

    // Handle mobile categories submenu toggle
    mobileCategoriesToggle?.addEventListener("click", (e) => {
        e.preventDefault();
        const categoriesMenu = document.querySelector(".mobile-categories-menu");
        categoriesMenu?.classList.toggle("open");
    });

    // Close categories submenu when clicking on a category link
    document.querySelectorAll(".mobile-categories-menu a").forEach(link => {
        link.addEventListener("click", () => {
            closeMobileMenu();
        });
    });
});


/* ========================================
7. FOOTER EMAIL VALIDATION
======================================== */

const newsletterForm = document.getElementById("newsletterForm");
const newsletterStatus = document.getElementById("newsletterStatus");

if (newsletterForm) {
    const newsletterEmail = document.getElementById("newsletterEmail");
    const emailRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    newsletterForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const emailValue = newsletterEmail.value.trim();
        
        newsletterEmail.classList.remove("error-input");
        newsletterStatus.textContent = "";
        newsletterStatus.className = "";

        if (emailValue === "") {
            newsletterEmail.classList.add("error-input");
            newsletterStatus.textContent = "Please enter your email.";
            newsletterStatus.className = "form-status error";
            return;
        } 
        
        if (!emailRule.test(emailValue)) {
            newsletterEmail.classList.add("error-input");
            newsletterStatus.textContent = "Please enter a valid email address.";
            newsletterStatus.className = "form-status error";
            return;
        }

        newsletterStatus.textContent = "Thank you for subscribing!";
        newsletterStatus.className = "form-status success";
        newsletterForm.reset();
    });
}
