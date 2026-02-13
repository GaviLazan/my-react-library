import { useState, useEffect } from "react";
import { getBooks } from "./utils/storage";
import seedLibrary from "./utils/seedLibrary";
import BookGrid from "./components/BookGrid";

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
      <BookGrid books={books}/>
    </div>
  );
}

export default App;
