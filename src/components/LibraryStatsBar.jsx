export default function LibraryStatsBar({ books }) {
  const totalBooks = books.length;
  const readCount = books.filter((book) => book.status === "read").length;
  const currentlyReading = books.filter(
    (book) => book.status === "reading",
  ).length;
  const onLoan = books.filter((book) => book.isLent === true).length;

  return (
    <div className="stats-bar">
      <h3>Library Stats</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ color: "#6b6b6b" }}>Total books</span>
        <strong style={{ color: "#507993" }}>{totalBooks}</strong>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ color: "#6b6b6b" }}>Books read</span>
        <strong style={{ color: "#7AAC6C" }}>{readCount}</strong>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ color: "#6b6b6b" }}>Currently reading</span>
        <strong style={{ color: "#1e5a99" }}>{currentlyReading}</strong>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ color: "#6b6b6b" }}>On loan</span>
        <strong style={{ color: "#F29325" }}>{onLoan}</strong>
      </div>
    </div>
  );
}
