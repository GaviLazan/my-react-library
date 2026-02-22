import seedData from "../data/seedData.json";
import { hasSeed, saveBooks } from "./storage";

export default function seedLibrary() {
  if (hasSeed()) {
    return;
  }
  const importedBooks = seedData.map((book) => ({
    ...book,
    status: null,
    rating: 0,
  }));

  saveBooks(importedBooks);

  localStorage.setItem("librarySeeded", "true");
}
