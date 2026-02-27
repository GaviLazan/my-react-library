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
        onAddBook({ title, author, coverUrl, isbn: "" });
        setTitle("");
        setAuthor("");
        setCoverUrl("");
        setErrorMessage("");
      };
      img.onerror = () => {
        setErrorMessage("Please paste valid image link.");
      };
      img.src = coverUrl;
      return;
    }
    const bookData = { title, author, coverUrl, isbn: "" };
    onAddBook(bookData);
    setTitle("");
    setAuthor("");
    setCoverUrl("");
    setErrorMessage("");
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
      <button type="submit">Add Book</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
}
