import { useState, useRef, useEffect } from "react";
import { fetchBookByISBN } from "../api/openLibrary";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

export default function AddBookForm({
  onAddBook,
  setBookFormState,
  showSnackbar,
}) {
  const [isbn, setIsbn] = useState("");
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isbn.trim()) {
      showSnackbar("Please enter an ISBN", "warning");
      return;
    }

    setIsLoading(true);
    try {
      const bookData = await fetchBookByISBN(isbn);
      onAddBook(bookData);
      setIsbn("");
      showSnackbar(`${bookData.title} added successfully`, "success");
      setIsLoading(false);
    } catch (error) {
      showSnackbar(`Error adding book: ${error.message}`, "warning");
      setIsLoading(false);
      return;
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <form className="add-book-form" onSubmit={handleSubmit}>
          <TextField
            size="small"
            label="Enter ISBN"
            value={isbn}
            inputRef={inputRef}
            onChange={(e) => {
              setIsbn(e.target.value);
            }}
          />
          <div
            style={{
              width: 120,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isLoading ? (
              <Button
                variant="contained"
                color="success"
                disabled
                sx={{ whiteSpace: "nowrap" }}
              >
                <CircularProgress size={14} sx={{ mr: 1 }} /> Adding...
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                type="submit"
                sx={{ whiteSpace: "nowrap" }}
              >
                Add Book
              </Button>
            )}{" "}
          </div>
        </form>
        <Button variant="outlined" sx={{ color: "#505050", whiteSpace: "nowrap" }} onClick={() => setBookFormState("add")}>
          Add Book Manually
        </Button>{" "}
      </div>
    </div>
  );
}
