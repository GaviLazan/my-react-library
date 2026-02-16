import { useState } from "react";

export default function ManualAddForm({ onAddBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverUrl, setCoverUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() && !author.trim()) {
      alert("Please enter title and author name.");
      return;
    } else if (!author.trim()) {
      alert("Please enter author name.");
      return;
    } else if (!title.trim()) {
      alert("Please enter title.");
      return;
    } else if (coverUrl) {
      const validExtensions = ["jpg", "jpeg", "png", "webp", "gif"];
      const extension = coverUrl.split(".").pop().toLowerCase();
      if (!validExtensions.includes(extension)) {
        alert("Please paste valid image link.");
        return;
      }
    }
    const bookData = { title, author, coverUrl, isbn: "" };
    onAddBook(bookData);
    setTitle("");
    setAuthor("");
    setCoverUrl("");
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
    </form>
  );
}
