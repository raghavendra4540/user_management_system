import "./SortBar.css";

function SortBar({
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
}) {
  return (
    <div className="sort-container">

      <select
        value={sortField}
        onChange={(e) => setSortField(e.target.value)}
      >
        <option value="firstName">First Name</option>
        <option value="lastName">Last Name</option>
        <option value="email">Email</option>
        <option value="department">Department</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="asc">Ascending (A-Z)</option>
        <option value="desc">Descending (Z-A)</option>
      </select>

    </div>
  );
}

export default SortBar;