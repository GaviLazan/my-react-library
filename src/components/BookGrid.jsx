import BookCard from "./BookCard";

export default function BookGrid({
  books,
  onDelete,
  onStatusChange,
  onLendBook,
  onReturnBook,
}) {
  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
          book={book}
          key={book.id}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
          onLendBook={onLendBook}
          onReturnBook={onReturnBook}
        />
      ))}
    </div>
  );
}
