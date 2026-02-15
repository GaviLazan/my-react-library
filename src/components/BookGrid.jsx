import BookCard from "./BookCard";

export default function BookGrid({ books, onDelete}) {
  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard book={book} key={book.id} onDelete={onDelete}/>
      ))}
    </div>
  );
}