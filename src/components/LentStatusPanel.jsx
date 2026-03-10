import lendLengthAsString from "../utils/lendLengthAsString";

export default function LentStatusPanel({ books }) {
  const lentBooks = books.filter((book) => book.isLent);

  return (
    <div className="lent-panel">
      <h3>On Loan</h3>
      {lentBooks.length === 0 && (
        <p style={{ color: "#6b6b6b", fontSize: "13px" }}>
          No books currently on loan
        </p>
      )}
      {lentBooks.map((book) => (
        <div key={book.id} style={{ marginBottom: "12px" }}>
          <strong>{book.title}</strong>
          <p
            className="lent-stat-name"
            style={{ color: "#6b6b6b", fontSize: "13px", margin: 0 }}
          >
            Lent to {book.lentTo} {lendLengthAsString(book.lentDate)}
          </p>
        </div>
      ))}
    </div>
  );
}
