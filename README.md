# React Library Tracker

A  personal library management app built with React, allowing you to track your book collection, reading status, lending history, and ratings.

## Tech Stack

- **React** (via Vite)
- **localStorage** for data persistence
- **axios** for API calls
- **MUI (Material UI)** — installed but not used until Sprint 3

## Features

### Core Features
- Add books via ISBN (Open Library API)
- Add books manually (title + author + cover URL)
- Delete books with confirmation dialog
- Track reading status: Untagged, To Be Read, Currently Reading, Read, Did Not Finish
- Lend books to friends with tracking (borrower name, lent date, overdue alerts)
- Return books
- Rate finished books (1-5 stars)
- Real-time search by title or author
- Filter by status and toggle lent book visibility
- Sort by title, author name, or rating
- Library statistics dashboard
- Edit book information

### Data Model
Each book contains:
- `id`, `title`, `author`, `coverUrl`, `isbn`
- `status`: `null | 'tbr' | 'reading' | 'read' | 'dnf'`
- `rating`: 0-5 (only for read/DNF books)
- `isLent`: boolean (separate from status — books keep their reading status when lent)
- `lentTo`, `lentDate` (lending metadata)
- `dateAdded`

## Project Structure

```
src/
├── api/
│   └── openLibrary.js      # Open Library API integration (ISBN lookup, author fallback)
├── components/
│   ├── AddBookForm.jsx     # ISBN input form
│   ├── ManualAddForm.jsx   # Manual book entry form
│   ├── BookCard.jsx        # Individual book card with delete button
│   └── BookGrid.jsx        # Grid layout for book cards
├── data/
│   └── seedData.json       # Seed data (migrated from v1 library.json)
├── utils/
│   ├── storage.js          # localStorage utilities (getBooks, saveBooks, hasSeed)
│   ├── seedLibrary.js      # Seed function (first-load migration)
│   └── dateHelpers.js      # Date utilities for lending duration (*not cmplete*)
├── App.jsx                 # Main app component
├── main.jsx                # React entry point
└── index.css               # Global styles
```

## Setup & Installation

```bash
# Clone the repo
git clone https://github.com/GaviLazan/my-react-library.git
cd my-react-library

# Install dependencies
npm install

# Run dev server
npm run dev
```

Visit `http://localhost:5173` in your browser.

## Development Timeline

### Sprint 0: Foundation
- Vite + React project setup
- localStorage utilities (getBooks, saveBooks, hasSeed)
- Seed function (migrates existing library.json data with new fields: status, rating, isLent)
- BookCard and BookGrid components
- CSS grid layout
- Image error handling (shows placeholder on broken images)
- RTL text support for Hebrew/Arabic titles and authors

### Sprint 1: Add, Delete, Status, Lending
- Open Library API integration with author fallback logic
- AddBookForm component (ISBN input + Enter key support)
- ManualAddForm component (title + author + cover URL)
- Delete with browser confirm() dialog
- Status selector (null/TBR/reading/read/DNF)
- Card visual indicators by status (colored borders)
- Lending system (lend/return with borrower tracking)
- Visual states (greyscale for lent books, red border for overdue)
- Date utility functions for lending duration
- Auto-save to localStorage on all changes
- Long title truncation (2-line limit with ellipsis)

### Sprint 2: Filters, Search, Stats, Edit
- Star rating component (visible only for read/DNF books)
- Status filter bar
- Real-time search
- Sort controls (title, author, rating)
- Library stats dashboard
- Lent out stats panel
- Edit book functionality
- Empty state messages
- Open Library attribution

### Sprint 3: MUI Polish & QA
- Replace plain HTML with MUI components
- Visual polish (card elevation, glows, responsive layout)
- MUI Tooltips on truncated titles
- Cross-browser testing
- Code cleanup
- QA and bug fixes

## Data Persistence

- **First load:** Seeds localStorage from `seedData.json` (existing library data from v1)
- **Subsequent loads:** Reads from localStorage
- **Auto-save:** All changes (add/delete/edit) automatically persist to localStorage
- **Seeded flag:** Prevents re-seeding on reload, even if library is empty

## API Integration

### Open Library API
- **Primary use:** Fetch book metadata by ISBN
- **Author fallback:** Checks both edition and work objects for author data (some books only have authors at the work level)
- **Cover images:** Uses `http://covers.openlibrary.org/b/id/{coverId}-M.jpg` (note: http, not https)
- **Attribution:** Open Library attribution displayed in footer

### BookCover API — Deferred to Post-Presentation
The BookCover API (https://bookcover.longitood.com) was successfully implemented but is currently disabled due to CORS policy blocking browser requests. The API works correctly but requires a backend proxy to bypass CORS restrictions.

**Status:** Code written and preserved for restoration when backend is added post-presentation.

**Code to restore** (place in `openLibrary.js` cover section):
```javascript
try {
  const bookCoverResponse = await axios.get(`https://bookcover.longitood.com/bookcover/${isbn}`);
  coverUrl = bookCoverResponse.data.url;
} catch {
  // BookCover failed, try Open Library
  if (bookData.covers && bookData.covers.length > 0) {
    const coverId = bookData.covers[0];
    coverUrl = `http://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
  }
}
```

## Known Issues

- Some books may return "Unknown Author" from Open Library API (upstream issue — some editions don't have author data)
- Cover quality varies by source availability
- BookCover API currently disabled (requires backend proxy for CORS)

## Academic Context

This project was built as part of the SheCodes bootcamp React module. The original assignment was a To-Do List app, but was adapted to rebuild an existing vanilla JavaScript library tracker in React.

**Learning objectives:**
- React fundamentals (components, state, props, hooks)
- Data persistence with localStorage
- API integration and error handling
- Component-driven architecture
- MUI integration
- Project planning and sprint-based development

**MUI integration** is deferred to Sprint 3 to focus on React fundamentals first, then add visual polish.

## Post-Presentation Enhancements

Planned improvements after bootcamp presentation:

1. **Add backend (Node/Express)** to enable BookCover API via proxy
2. **Enable title search** (Open Library search API) for books without ISBNs (useful for Israeli books with Dancodes instead of ISBNs)
3. **Dark mode toggle**
4. **Export/import library data**

---

**Built by:** Gavi Lazan  
**Course:** SheCodes Fullstack Bootcamp  
**Presentation Date:** February 27, 2026
**Last Updated:** February 16, 2026