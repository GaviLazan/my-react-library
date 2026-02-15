# React Library Tracker

A personal library management app built with React, allowing you to track your book collection, reading status, lending history, and ratings.

## Tech Stack

- **React** (via Vite)
- **localStorage** for data persistence
- **axios** for API calls
- **MUI (Material UI)** for UI components (added in Sprint 3)

## Features

### Core Features

- Add books via ISBN (Open Library API) or manually
- Delete books with confirmation
- Track reading status: Untagged, To Be Read, Currently Reading, Read, Did Not Finish
- Lend books to friends with tracking (borrower name, lent date, overdue alerts)
- Rate finished books (1-5 stars)
- Real-time search by title or author
- Filter by status and toggle lent book visibility
- Sort by date added, title, or rating
- Library statistics dashboard

### Data Model

Each book contains:

- `id`, `title`, `author`, `coverUrl`, `isbn`
- `status`: `null | 'tbr' | 'reading' | 'read' | 'dnf'`
- `rating`: 0-5 (only for read/DNF books)
- `isLent`: boolean (separate from status)
- `lentTo`, `lentDate` (lending metadata)
- `dateAdded`

## Project Structure

```
src/
├── api/              # API integration (Open Library, BookCover API)
├── components/       # React components (BookCard, BookGrid, etc.)
├── data/            # Seed data (library.json converted to seedData.json)
├── utils/           # Utilities (storage, date helpers, seed function)
├── App.jsx          # Main app component
└── main.jsx         # React entry point
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

### Sprint 0: Foundation ✅

- Vite + React project setup
- localStorage utilities (`getBooks`, `saveBooks`, `hasSeed`)
- Seed function (migrates existing library.json data)
- Basic BookCard and BookGrid components
- CSS grid layout

### Sprint 1: Add, Delete, Status, Lending (In Progress)

- ISBN and manual book addition
- Delete with confirmation
- Status selector (null/TBR/reading/read/DNF)
- Lending system (isLent overlay, not a status)
- Overdue detection

### Sprint 2: Filters, Search, Stats

- Status filter bar
- Real-time search
- Sort controls
- Library stats dashboard
- Edit book functionality

### Sprint 3: MUI Polish & QA

- Replace plain HTML with MUI components
- Visual polish (card elevation, glows, responsive layout)
- Cross-browser testing

## Data Persistence

- **First load:** Seeds localStorage from `seedData.json` (existing library data)
- **Subsequent loads:** Reads from localStorage
- **Auto-save:** All changes (add/delete/edit) automatically persist to localStorage
- **Seeded flag:** Prevents re-seeding on reload, even if library is empty

## API Integration

- **Open Library API:** Fetches book metadata by ISBN
- **BookCover API:** Primary source for cover images (fallback to Open Library)
- **Attribution:** Open Library attribution displayed in footer

## Known Issues

- Some books may return "Unknown Author" from Open Library API (known upstream issue)
- Cover quality varies by source availability

## Academic Context

This project was built as part of the SheCodes bootcamp React module. The original assignment was a To-Do List app, but was adapted to rebuild an existing vanilla JavaScript library tracker in React.

**Learning objectives:**

- React fundamentals (components, state, props, hooks)
- Data persistence with localStorage
- API integration and error handling
- Component-driven architecture
- MUI integration
- Project planning and sprint-based development

---

**Built by:** Gavi Lazan
**Course:** SheCodes Fullstack Bootcamp  
**Presentation Date:** February 27, 2026
