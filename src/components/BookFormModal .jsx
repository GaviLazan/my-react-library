import { useState } from "react";

export default function BookFormModal({
  onAddBook,
  onEditBook,
  bookFormState,
  setBookFormState,
}) {
  const [title, setTitle] = useState(bookFormState?.title || "");
  const [author, setAuthor] = useState(bookFormState?.author || "");
  const [coverUrl, setCoverUrl] = useState(bookFormState?.coverUrl || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [lentTo, setLentTo] = useState(bookFormState?.lentTo || "");
  const [lentDate, setLentDate] = useState(bookFormState?.lentDate || "");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() && !author.trim()) {
      setErrorMessage("Please enter title and author name.");
      return;
    } else if (!author.trim()) {
      setErrorMessage("Please enter author name.");
      return;
    } else if (!title.trim()) {
      setErrorMessage("Please enter title.");
      return;
    } else if (coverUrl) {
      const img = new Image();
      img.onload = () => {
        if (bookFormState === "add") {
          onAddBook({ title, author, coverUrl, isbn: "" });
          setTitle("");
          setAuthor("");
          setCoverUrl("");
          setErrorMessage("");
        } else {
          const updatedData = { title, author, coverUrl, lentTo, lentDate };
          onEditBook(bookFormState.id, updatedData);
          setBookFormState(null);
        }
      };
      img.onerror = () => {
        setErrorMessage("Please paste valid image link.");
      };
      img.src = coverUrl;
      return;
    }
    if (bookFormState === "add") {
      const bookData = { title, author, coverUrl, isbn: "" };
      onAddBook(bookData);
      setTitle("");
      setAuthor("");
      setCoverUrl("");
      setErrorMessage("");
    } else {
      const updatedData = { title, author, coverUrl, lentTo, lentDate };
      onEditBook(bookFormState.id, updatedData);
      setBookFormState(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Author:</label>
      <input
        placeholder="Enter Author Name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <label>Cover URL:</label>
      <input
        placeholder="Enter URL"
        value={coverUrl}
        onChange={(e) => setCoverUrl(e.target.value)}
      />
      {bookFormState?.isLent === true && (
        <div>
          <label>Lent to:</label>
          <input value={lentTo} onChange={(e) => setLentTo(e.target.value)} />
          <label>Lent on:</label>
          <input
            value={lentDate}
            onChange={(e) => setLentDate(e.target.value)}
          />
        </div>
      )}
      <button type="submit">
        {bookFormState !== "add" ? "Save Changes" : "Add Book"}
      </button>
      <button onClick={()=>setBookFormState(null)}>Cancel</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
}
