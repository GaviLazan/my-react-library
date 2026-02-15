import { useState, useEffect } from "react";

export default function BookCard({ book, onDelete }) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [book.coverUrl]);

  console.log("BookCard render:", {
    title: book.title,
    coverUrl: book.coverUrl,
    imageError,
  });

  return (
    <div className="book-card">
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
      <h3>{book.title}</h3>
      <p>{book.author}</p>
    </div>
  );
}
