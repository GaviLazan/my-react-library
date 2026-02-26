import { useState } from "react";
import lendLengthCalc from "../utils/lendLengthCalc.js";

export default function BookCard({
  book,
  onDelete,
  onStatusChange,
  onLendBook,
  onReturnBook,
  onRatingChange,
}) {
  const [imageError, setImageError] = useState(false);
  const [showLendForm, setShowLendForm] = useState(false);
  const [lentTo, setLentTo] = useState("");
  const [lendError, setLendError] = useState("")

  const lentPercent = book.isLent ? lendLengthCalc(book.lentDate) / 100 : 0;

  const handleStatusChange = (e) => {
    onStatusChange(book.id, e.target.value);
  };

  // console.log("BookCard render:", {
  //   title: book.title,
  //   coverUrl: book.coverUrl,
  //   imageError,
  // });

  const handleSubmitLend = (e) => {
    e.preventDefault();
    if (lentTo === "") {
      setLendError("Please enter a borrower name");
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    onLendBook(book.id, lentTo, today);
    setShowLendForm(false);
  };

  return (
    <div
      className={`book-card ${book.isLent ? "lent" : ""}`}
      data-status={book.status}
      style={{ boxShadow: `0 0 20px 0 rgba(255, 0, 0, ${lentPercent})` }}
    >
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
      {book.isLent ? (
        <p dir="auto">
          Lent to: {book.lentTo} on{" "}
          {new Date(book.lentDate).toLocaleDateString("en-GB")}
        </p>
      ) : (
        <p dir="auto">{book.author}</p>
      )}
      <span>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            className="star-rating"
            key={star}
            onClick={() => onRatingChange(book.id, star)}
          >
            {star <= book.rating ? "★" : "☆"}
          </span>
        ))}
      </span>
      <select
        className="status-select"
        value={book.status || "null"}
        onChange={handleStatusChange}
      >
        <option value="null">No Status</option>
        <option value="tbr">TBR</option>
        <option value="reading">Currently Reading</option>
        <option value="read">Read</option>
        <option value="dnf">DNF</option>
      </select>
      {!book.isLent && !showLendForm && (
        <button onClick={() => setShowLendForm(true)}>Lend Book</button>
      )}
      {!book.isLent && showLendForm && (
        <form>
          <label>Lend to:</label>
          <input
            type="text"
            value={lentTo}
            onChange={(e) => setLentTo(e.target.value)}
            placeholder="Who is borrowing the book?"
          />
          <button type="submit" onClick={handleSubmitLend}>
            Lend Book
          </button>
          {lendError && <p className="error-message">{lendError}</p>}
        </form>
      )}
      {book.isLent && (
        <button onClick={() => onReturnBook(book.id)}>Return Book</button>
      )}
    </div>
  );
}
