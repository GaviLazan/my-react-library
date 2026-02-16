import { useState, useEffect } from "react";
import { getBooks, saveBooks } from "./utils/storage";
import seedLibrary from "./utils/seedLibrary";
import BookGrid from "./components/BookGrid";
import AddBookForm from "./components/AddBookForm";
import ManualAddForm from "./components/ManualAddForm";
// import ManualAddForm from "./components/ManualAddForm";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    seedLibrary();
    const bookList = getBooks();
    setBooks(bookList);
  }, []);

  function handleAddBook(bookData) {
    const newBook = {
      ...bookData,
      id: Date.now(),
      status: null,
      isLent: false,
      rating: 0,
      lentTo: "",
      lentDate: "",
      dateAdded: new Date().toISOString(),
    };

    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    saveBooks(updatedBooks);
  }

  function handleDelete(bookId) {
    const updatedBooks = books.filter((book) => book.id !== bookId);
    setBooks(updatedBooks);
    saveBooks(updatedBooks);
  }

  return (
    <div>
      <h1>My Library</h1>
      <AddBookForm onAddBook={handleAddBook} />
      <ManualAddForm onAddBook={handleAddBook} />
      <p>Total books: {books.length}</p>
      <BookGrid books={books} onDelete={handleDelete} />
    </div>
  );
}

export default App;
