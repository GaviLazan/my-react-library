export function getBooks() {
  const booksString = localStorage.getItem("books");
  if (booksString === null) {
    return [];
  }
  return JSON.parse(booksString);
}

export function saveBooks(booksArray) {
  localStorage.setItem("books", JSON.stringify(booksArray));
}

export function hasSeed() {
  return localStorage.getItem("librarySeeded") !== null;
}
