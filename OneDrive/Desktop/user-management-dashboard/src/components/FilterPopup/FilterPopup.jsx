import "./FilterPopup.css";

function FilterPopup({
  filters,
  setFilters,
  showFilter,
  setShowFilter,
}) {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const clearFilters = () => {
    setFilters({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    });
  };

  return (
    <>
      <div className="filter-btn-container">
        <button
          className="filter-btn"
          onClick={() => setShowFilter(!showFilter)}
        >
          {showFilter ? "Close Filters" : "Filters"}
        </button>
      </div>

      {showFilter && (
        <div className="filter-popup">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={filters.firstName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={filters.lastName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="email"
            placeholder="Email"
            value={filters.email}
            onChange={handleChange}
          />

          <select
            name="department"
            value={filters.department}
            onChange={handleChange}
          >
            <option value="">All Departments</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Finance">Finance</option>
          </select>

          <button onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      )}
    </>
  );
}

export default FilterPopup;