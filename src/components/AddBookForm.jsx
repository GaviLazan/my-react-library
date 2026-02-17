import { useState } from "react";
import { fetchBookByISBN } from "../api/openLibrary";

export default function AddBookForm({ onAddBook }) {
  const [isbn, setIsbn] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isbn.trim()) {
      setErrorMessage("Please enter an ISBN");
      return;
    }

    try {
      const bookData = await fetchBookByISBN(isbn);
      onAddBook(bookData);
      setIsbn("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(`Error adding book: ${error.message}`);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Enter ISBN"
        value={isbn}
        onChange={(e) => {
          setIsbn(e.target.value);
          setErrorMessage("");
        }}
      />
      <button type="submit">Add Book</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
}
