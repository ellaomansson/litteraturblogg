const books = [
  {
    title: "The Goldfinch",
    author: "Donna Tartt",
    year: 2013,
    genre: "Roman",
    analysis: "En komplex coming-of-age-berättelse med fokus på trauma och konst."
  },
  {
    title: "American Psycho",
    author: "Bret Easton Ellis",
    year: 1991,
    genre: "Satir / Thriller",
    analysis: "En mörk och satirisk skildring av 1980-talets yuppiekultur och konsumism."
  },
  {
    title: "Slouching Towards Bethlehem",
    author: "Joan Didion",
    year: 1968,
    genre: "Essä",
    analysis: "En samling essäer som skildrar amerikansk kultur och samhälle på 1960-talet."
  }
];

// Funktion för att generera bokkort
function displayBooks(filter = "all", search = "") {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";

  let filteredBooks = books.filter(book => {
    return (filter === "all" || book.author === filter) &&
           (book.title.toLowerCase().includes(search) || book.author.toLowerCase().includes(search));
  });

  filteredBooks.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Författare:</strong> ${book.author}</p>
      <p><strong>År:</strong> ${book.year}</p>
      <p><strong>Genre:</strong> ${book.genre}</p>
      <p><strong>Analys:</strong> ${book.analysis}</p>
    `;
    bookList.appendChild(card);
  });
}

// Fyll dropdown med författare
const authorFilter = document.getElementById("authorFilter");
const authors = [...new Set(books.map(book => book.author))];
authors.forEach(author => {
  const option = document.createElement("option");
  option.value = author;
  option.textContent = author;
  authorFilter.appendChild(option);
});

// Event listeners
authorFilter.addEventListener("change", () => {
  displayBooks(authorFilter.value, document.getElementById("searchInput").value.toLowerCase());
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  displayBooks(authorFilter.value, e.target.value.toLowerCase());
});

// Initial rendering
displayBooks();
