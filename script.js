// script.js
// Enkel men komplett frontend: renderar böcker, filter, sökning, lägg till, localStorage, modal, tema.

const STORAGE_KEY = "litcorner.books.v1";

// startdata
const sampleBooks = [
  {
    id: cryptoRandomId(),
    title: "Den oändliga historien",
    author: "Michael Ende",
    year: 1979,
    genre: "Fantasy",
    description: "En klassisk fantasifabel om mod, berättelser och verklighetens gränser."
  },
  {
    id: cryptoRandomId(),
    title: "Svindelns logik",
    author: "Elin Wägner",
    year: 1915,
    genre: "Roman",
    description: "En tidig 1900-talsroman som utforskar identitet och samhällsomvandling."
  },
  {
    id: cryptoRandomId(),
    title: "Främlingen",
    author: "Albert Camus",
    year: 1942,
    genre: "Existentialism",
    description: "Kort roman om absurditet, ansvar och mänsklig alienation."
  }
];

function cryptoRandomId(){
  return "id-" + Math.random().toString(36).slice(2,10);
}

// UI element-referenser
const booksGrid = document.getElementById("booksGrid");
const bookTpl = document.getElementById("bookCardTemplate");
const searchInput = document.getElementById("search");
const genreFilter = document.getElementById("genreFilter");
const sortSelect = document.getElementById("sortSelect");
const addBookForm = document.getElementById("addBookForm");
const countBooks = document.getElementById("countBooks");
const uniqueGenres = document.getElementById("uniqueGenres");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");
const themeToggle = document.getElementById("themeToggle");
const clearStorageBtn = document.getElementById("clearStorage");

let books = loadBooks();

// init
populateGenreOptions();
renderBooks();
attachEventListeners();
restoreTheme();

// --- functions ---
function loadBooks(){
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleBooks));
      return structuredClone(sampleBooks);
    }
    return JSON.parse(raw);
  } catch(e){
    console.error("Kunde inte läsa localStorage, använder sampledata", e);
    return structuredClone(sampleBooks);
  }
}

function saveBooks(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  populateGenreOptions();
  updateStats();
}