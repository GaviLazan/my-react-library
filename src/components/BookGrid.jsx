import BookCard from "./BookCard";

function BookGrid({ books }) {
  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard book={book} key={book.id} />
      ))}
    </div>
  );
}

export default BookGrid;
