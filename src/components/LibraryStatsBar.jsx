export default function LibraryStatsBar({ books }) {
  const totalBooks = books.length;
  const readCount = books.filter((book) => book.status === "read").length;
  const currentlyReading = books.filter(
    (book) => book.status === "reading",
  ).length;
  const onLoan = books.filter((book) => book.isLent === true).length;

  return (
    <div>
      <p>{`${totalBooks} books in library`}</p>
      <p>{`${readCount} books read`}</p>
      <p>{`Currently reading ${currentlyReading} books`}</p>
      <p>{`${onLoan} books on loan`}</p>
    </div>
  );
}
