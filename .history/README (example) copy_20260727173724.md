# 🔍 The Bookish Clue — Responsive Web Design Project

> **BIBWB1114 Web Design Group Assignment**  
> **Faculty of Computer Science & Information Computing Technology**  
> *New Era University College*

---

## 📌 Project Overview



---

## 🎨 Design & Aesthetic

* **Theme:** Mystery / Detective
* **Color Palette:**
* **Typography:** 

---

## 🗂️ Web Architecture & Pages

The website consists of 4 interconnected pages:

1. **`index.html` (Home Page):**  
   Hero banner introducing the bookstore, "Top Suspects" featured book section, and quick-access category teasers.
2. **`catalog.html` (Case Files & Catalog Page):**  
   Interactive book gallery displaying the store's full collection rendered dynamically from a JavaScript dataset (`books.js`).
3. **`about.html` (Investigation Team / About Us):**  
   Fictional backstory of the bookstore alongside structured "Investigator Dossiers" introducing the project's development team.
4. **`contact.html` (Tip Line / Contact Page):**  
   Case submission form with client-side JavaScript input validation and dynamic success alerts.

---

## ⚡ JavaScript Interactivity Features

* **Dynamic Product Filter (`js/catalog.js`):**  
  Allows users to filter books by subgenres (*Locked Room*, *Classic Detective*, *Historical Mystery*) in real time without page reloads.
* **Interactive Contact Form (`js/contact.js`):**  
  Performs real-time regex validation on email and phone inputs, displaying error boundaries for invalid data and a dynamic success stamp upon valid submission.
* **Custom Interactive UI Component (`js/main.js`):**  
  *[Insert your unique feature here, e.g., Dark/Light Mode Toggle / Interactive Book Clue Inspection Lightbox]*

---

## 📁 File & Folder Structure

```text
GroupNo_ShortTitle/
│
├── assets/
│   ├── book/             # Book cover artwork
│   ├── fonts/
│   └── images/           # UI icons & badges
│
├── css/
│   └── style.css            # Centralized stylesheet with variables & section comments
│
├── html/
│   └── about.html          
│   └── book.html          
│   └── contact.html          
│   └── index.html          
│   └── shop.html          
│
├── js/
│   ├── books.js            # Structured array dataset holding book records
│   ├── ?.js          # Dynamic DOM rendering and catalog filter logic
│   ├── contact.js          # Client-side form validation script
│   └── main.js             # Global navigation and interactive UI components
│
└── README.md               # Project Documentation