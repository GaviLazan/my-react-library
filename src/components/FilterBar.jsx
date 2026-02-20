export default function FilterBar({ activeFilter, handleFilterChange }) {
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
    </>
  );
}
