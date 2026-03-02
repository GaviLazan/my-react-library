# React Library Tracker

A personal library management app built with React, allowing you to track your book collection, reading status, lending history, and ratings.

## Tech Stack

- **React** (via Vite)
- **localStorage** for data persistence
- **axios** for API calls
- **MUI (Material UI)** — installed but not used until Sprint 3

## Features

### Core Features

- Add books via ISBN (Open Library API)
- Add books manually (title + author + cover URL) via modal form
- Delete books with confirmation dialog
- Track reading status: Untagged, To Be Read, Currently Reading, Read, Did Not Finish
- Lend books to friends with tracking (borrower name, lent date, overdue alerts)
- Return books
- Rate books 1-5 stars
- Real-time search by title or author
- Filter by status and toggle lent book visibility
- Sort by title, author name, rating, or date added (ascending/descending)
- Library statistics dashboard
- Lent out stats panel with human-readable duration
- Edit book information (title, author, cover URL, lent info)
- Empty state messages for filtered/search results

### Data Model

Each book contains:

- `id`, `title`, `author`, `coverUrl`, `isbn`
- `status`: `null | 'tbr' | 'reading' | 'read' | 'dnf'`
- `rating`: 0-5
- `isLent`: boolean (separate from status — books keep their reading status when lent)
- `lentTo`, `lentDate` (lending metadata)
- `dateAdded`

## Project Structure

```
src/
├── api/
│   └── openLibrary.js          # Open Library API integration (ISBN lookup, author fallback)
├── components/
│   ├── AddBookForm.jsx          # ISBN input form
│   ├── BookFormModal.jsx        # Combined add/edit modal form (replaces ManualAddForm)
│   ├── BookCard.jsx             # Individual book card
│   ├── BookGrid.jsx             # Grid layout for book cards
│   ├── FilterBar.jsx            # Status filter buttons + hide lent toggle
│   ├── SortBar.jsx              # Sort type dropdown + asc/desc toggle
│   ├── LentStatusPanel.jsx      # Panel listing all lent books with duration
│   └── LibraryStatsBar.jsx      # Stats bar (total, read, reading, lent)
├── data/
│   └── seedData.json            # Seed data (migrated from v1 library.json)
├── utils/
│   ├── storage.js               # localStorage utilities (getBooks, saveBooks, hasSeed)
│   ├── seedLibrary.js           # Seed function (first-load migration)
│   ├── lendLengthCalc.js        # Lent duration as 0-100% (used for red glow intensity)
│   └── lendLengthAsString.js    # Lent duration as human-readable string (e.g. "3 weeks")
├── App.jsx                      # Main app component — all state and handlers
├── main.jsx                     # React entry point
└── index.css                    # Global styles
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
- Delete with browser confirm() dialog
- Status selector (null/TBR/reading/read/DNF)
- Card visual indicators by status (colored cards)
- Lending system (lend/return with borrower name and auto-generated date)
- Gradual red glow on lent cards (starts at 4 weeks, maxes at 6 months)
- Lent cards show borrower name and date instead of author
- Dates stored as ISO format (yyyy-mm-dd), displayed as dd/mm/yyyy
- Auto-save to localStorage on all changes
- Long title truncation (2-line limit with ellipsis)

### Sprint 2: Filters, Search, Stats, Edit

- Star rating (1-5 stars, all books)
- Status filter bar (All / Untagged / TBR / Reading / Read / DNF)
- Hide lent books toggle
- Sort controls: title, author, rating, date added — ascending and descending; resets to ascending on sort type change
- Real-time search (title and author, case-insensitive, partial match)
- Empty state messages ("No books matching X" / "No books in X")
- Lent out stats panel with human-readable duration (today / days / weeks / months / years)
- Library stats bar (total, read, reading, on loan)
- BookFormModal: combined add and edit form (modal wrapper deferred to Sprint 3)
- Edit button on each card
- Open Library + favicon attribution in footer
- Inline validation for lend form, manual add, and image URL (no browser alerts)
- Image URL validated via new Image() load test
- useRef auto-focus on lender name input when lend form opens

### Sprint 3: MUI Polish & QA *(upcoming)*

- Auto-focus ISBN input on page load; auto-focus title field when BookFormModal opens
- Replace plain HTML with MUI components (Button, TextField, Select, Card, Dialog, Rating, Chip, Tooltip)
- Convert BookFormModal and lend form to MUI Dialog overlays (with background disable and click-outside-to-close)
- Replace browser confirm() with MUI Dialog for delete confirmation
- Replace star rating spans with MUI Rating component
- Add optional date picker for lend date (defaults to today)
- MUI Tooltips on truncated titles
- Card glow/elevation based on status
- Responsive layout review
- Cross-browser testing (Chrome + Firefox minimum)
- Remove all console.log statements
- Verify localStorage seed works on fresh browser
- Write demo script / talking points

## Data Persistence

- **First load:** Seeds localStorage from `seedData.json` (existing library data from v1)
- **Subsequent loads:** Reads from localStorage
- **Auto-save:** All changes (add/delete/edit/lend/return/rate) automatically persist to localStorage
- **Seeded flag:** Prevents re-seeding on reload, even if library is empty

## API Integration

### Open Library API

- **Primary use:** Fetch book metadata by ISBN
- **Author fallback:** Checks both edition and work objects for author data
- **Cover images:** Uses `http://covers.openlibrary.org/b/id/{coverId}-M.jpg` (note: http, not https)
- **Attribution:** Open Library attribution displayed in footer

### BookCover API — Deferred to Post-Presentation

The BookCover API (https://bookcover.longitood.com) was successfully implemented but is currently disabled due to CORS policy blocking browser requests. Requires a backend proxy.

**Code to restore** (place in `openLibrary.js` cover section):

```javascript
try {
  const bookCoverResponse = await axios.get(
    `https://bookcover.longitood.com/bookcover/${isbn}`,
  );
  coverUrl = bookCoverResponse.data.url;
} catch {
  if (bookData.covers && bookData.covers.length > 0) {
    const coverId = bookData.covers[0];
    coverUrl = `http://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
  }
}
```

## Known Issues

- Some books may return "Unknown Author" from Open Library API (upstream issue)
- Cover quality varies by source availability
- BookCover API currently disabled (requires backend proxy for CORS)
- Image covers reload on filter change (Open Library CDN caching behavior, not a code issue)

## Academic Context

This project was built as part of the SheCodes bootcamp React module. The original assignment was a To-Do List app, adapted to rebuild an existing vanilla JavaScript library tracker in React.

**Learning objectives:**

- React fundamentals (components, state, props, hooks)
- Data persistence with localStorage
- API integration and error handling
- Component-driven architecture
- MUI integration
- Project planning and sprint-based development

**MUI integration** is deferred to Sprint 3 to focus on React fundamentals first.

## Post-Presentation Enhancements

1. **Add backend (Node/Express)** to enable BookCover API via proxy
2. **Enable title search** (Open Library search API) for books without ISBNs
3. **Dark mode toggle**
4. **Export/import library data**
5. **Drag and drop manual sorting**
6. **Lent duration refinement** (e.g. "1 year 3 months 2 weeks")

---

**Built by:** Gavi Lazan  
**Course:** SheCodes Fullstack Bootcamp
**Last Updated:** March 3, 2026