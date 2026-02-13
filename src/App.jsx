import { useState, useEffect } from "react";
import { getBooks } from "./utils/storage";
import seedLibrary from "./utils/seedLibrary";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    seedLibrary();
    const bookList = getBooks();
    setBooks(bookList);
  }, []); // Empty array means this runs once on mount

  return (
    <div>
      <h1>My Library</h1>
      <p>Total books: {books.length}</p>
      {/* For now, just show book titles in a list */}
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
