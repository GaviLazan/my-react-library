export default function SortBar({
  activeSort,
  handleSortChange,
  sortAscending,
  setSortAscending,
}) {
  return (
    <>
      <select
        className="sort-select"
        value={activeSort}
        onChange={(e) => handleSortChange(e.target.value)}
      >
        <option value="title">Sort by title</option>
        <option value="author">Sort by author</option>
        <option value="rating">Sort by rating</option>
        <option value="date">Sort by date added</option>
      </select>
      <label> Sort descending? </label>
      <input
        type="checkbox"
        onChange={() => setSortAscending(sortAscending ? false : true)}
        checked={sortAscending}
      />
    </>
  );
}
