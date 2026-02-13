export default function BookCard({ book }) {
  return (
    <div className="book-card">
    {book.coverUrl ? <img src={book.coverUrl} alt={book.title} /> : <div>{book.title[0]}</div>}
      <h3>{book.title}</h3>
      <p>{book.author}</p>
    </div>
  );
}