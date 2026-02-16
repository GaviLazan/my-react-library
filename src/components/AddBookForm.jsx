import { useState } from "react";
import { fetchBookByISBN } from "../api/openLibrary";

export default function AddBookForm({ onAddBook }) {
  const [isbn, setIsbn] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isbn.trim()) {
      alert("Please enter an ISBN");
      return;
    }

    try {
      const bookData = await fetchBookByISBN(isbn);
      onAddBook(bookData);
      setIsbn("");
    } catch (error) {
      alert(`Error adding book`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Enter ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
      />
      <button type="submit">Add Book</button>
    </form>
  );
}
