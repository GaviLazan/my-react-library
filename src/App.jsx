import { useState, useEffect } from "react";
import { getBooks, saveBooks } from "./utils/storage";
import seedLibrary from "./utils/seedLibrary";
import BookGrid from "./components/BookGrid";
import AddBookForm from "./components/AddBookForm";
import ManualAddForm from "./components/ManualAddForm";

export default function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    seedLibrary();
    const bookList = getBooks();
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  function handleStatusChange(bookId, newStatus) {
    const updatedBooks = books.map((book) =>
      book.id === bookId ? { ...book, status: newStatus } : book,
    );
    setBooks(updatedBooks);
    saveBooks(updatedBooks);
  }

  function handleLendBook(bookId, lentTo, lentDate) {
    const lendBook = books.map((book) =>
      book.id === bookId
        ? { ...book, isLent: true, lentTo: lentTo, lentDate: lentDate }
        : book,
    );
    setBooks(lendBook);
    saveBooks(lendBook);
  }

  function handleReturnBook(bookId) {
    const returnBook = books.map((book) =>
      book.id === bookId
        ? { ...book, isLent: false, lentTo: "", lentDate: "" }
        : book,
    );
    setBooks(returnBook);
    saveBooks(returnBook);
  }

  return (
    <div>
      <h1>My Library</h1>
      <AddBookForm onAddBook={handleAddBook} />
      <ManualAddForm onAddBook={handleAddBook} />
      <p>Total books: {books.length}</p>
      <BookGrid
        books={books}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
        onLendBook={handleLendBook}
        onReturnBook={handleReturnBook}
      />
    </div>
  );
}
