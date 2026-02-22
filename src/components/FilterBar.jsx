export default function FilterBar({
  activeFilter,
  handleFilterChange,
  lentFilter,
  setLentFilter,
}) {
  return (
    <>
      <button
        className={activeFilter === "all" ? "active-filter" : ""}
        onClick={() => handleFilterChange("all")}
      >
        All
      </button>
      <button
        className={activeFilter === "untagged" ? "active-filter" : ""}
        onClick={() => handleFilterChange("untagged")}
      >
        Untagged
      </button>
      <button
        className={activeFilter === "tbr" ? "active-filter" : ""}
        onClick={() => handleFilterChange("tbr")}
      >
        TBR
      </button>
      <button
        className={activeFilter === "reading" ? "active-filter" : ""}
        onClick={() => handleFilterChange("reading")}
      >
        Currently Reading
      </button>
      <button
        className={activeFilter === "read" ? "active-filter" : ""}
        onClick={() => handleFilterChange("read")}
      >
        Read
      </button>
      <button
        className={activeFilter === "dnf" ? "active-filter" : ""}
        onClick={() => handleFilterChange("dnf")}
      >
        DNF
      </button>
      <label> Hide Lent Books: </label>
      <input
        type="checkbox"
        onChange={() => setLentFilter(lentFilter ? false : true)}
        checked={lentFilter}
      />
    </>
  );
}
