import { useState } from "react";

export default function BookCard({ book, onDelete, onStatusChange }) {
  const [imageError, setImageError] = useState(false);

  const handleStatusChange = (e) => {
    onStatusChange(book.id, e.target.value);
  };

  console.log("BookCard render:", {
    title: book.title,
    coverUrl: book.coverUrl,
    imageError,
  });

  return (
    <div className="book-card" data-status={book.status}>
      <button
        className="delete-btn"
        onClick={() => {
          if (confirm("Are you sure you want to delete this book?")) {
            onDelete(book.id);
          }
        }}
      >
        x
      </button>
      {book.coverUrl && !imageError ? (
        <img
          src={book.coverUrl}
          alt={book.title}
          onError={() => setImageError(true)}
        />
      ) : (
        <div>{book.title}</div>
      )}
      <h3 dir="auto">{book.title}</h3>
      <p dir="auto">{book.author}</p>
      <select className="status-select" value={book.status || "null"} onChange={handleStatusChange}>
        <option value="null">Select Status</option>
        <option value="tbr">TBR</option>
        <option value="reading">Currently Reading</option>
        <option value="read">Read</option>
        <option value="dnf">DNF</option>
      </select>
    </div>
  );
}
