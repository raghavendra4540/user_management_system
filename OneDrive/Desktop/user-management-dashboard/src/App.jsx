import { useState } from "react";

import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import SortBar from "./components/SortBar/SortBar";
import FilterPopup from "./components/FilterPopup/FilterPopup";
import UserTable from "./components/UserTable/UserTable";
import Pagination from "./components/Pagination/Pagination";
import UserForm from "./components/UserForm/UserForm";
import ConfirmDelete from "./components/ConfirmDelete/ConfirmDelete";
import Loader from "./components/Loader/Loader";

import useUsers from "./hooks/useUsers";

import {
  createUser,
  updateUser,
  deleteUser,
} from "./api/userService";

import "./App.css";

function App() {
  const { users, setUsers, loading, error } = useUsers();

  // Search
  const [search, setSearch] = useState("");

  // Sort
  const [sortField, setSortField] = useState("firstName");
  const [sortOrder, setSortOrder] = useState("asc");

  // Filter
  const [showFilter, setShowFilter] = useState(false);

  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Add/Edit
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Delete
  const [showDelete, setShowDelete] = useState(false);
  const [deletingUser, setDeletingUser] = useState(null);

  // Search + Filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      user.firstName
        .toLowerCase()
        .includes(filters.firstName.toLowerCase()) &&
      user.lastName
        .toLowerCase()
        .includes(filters.lastName.toLowerCase()) &&
      user.email
        .toLowerCase()
        .includes(filters.email.toLowerCase()) &&
      user.department
        .toLowerCase()
        .includes(filters.department.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  // Sort
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const valueA = a[sortField].toLowerCase();
    const valueB = b[sortField].toLowerCase();

    return sortOrder === "asc"
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA);
  });

  // Pagination
  const totalPages = Math.ceil(sortedUsers.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;

  const visibleUsers = sortedUsers.slice(
    startIndex,
    startIndex + pageSize
  );

  // Save User
  const handleSave = async (userData) => {
    try {
      if (editingUser) {
        await updateUser(editingUser.id, userData);

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === editingUser.id
              ? { ...userData, id: editingUser.id }
              : user
          )
        );
      } else {
        const response = await createUser(userData);

        setUsers((prevUsers) => [
          {
            ...response.data,
            id: prevUsers.length + 1,
          },
          ...prevUsers,
        ]);
      }

      setEditingUser(null);
      setShowForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Edit User
  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  // Open Delete Modal
  const handleDelete = (user) => {
    setDeletingUser(user);
    setShowDelete(true);
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    try {
      await deleteUser(deletingUser.id);

      setUsers((prevUsers) =>
        prevUsers.filter(
          (user) => user.id !== deletingUser.id
        )
      );

      setDeletingUser(null);
      setShowDelete(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />

      <div
        style={{
          width: "90%",
          margin: "20px auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>User Management</h2>

        <button
          onClick={() => {
            setEditingUser(null);
            setShowForm(true);
          }}
        >
          Add User
        </button>
      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <SortBar
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <FilterPopup
        filters={filters}
        setFilters={setFilters}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
      />

      <UserForm
        showForm={showForm}
        setShowForm={setShowForm}
        onSave={handleSave}
        editingUser={editingUser}
      />

      <ConfirmDelete
        showDelete={showDelete}
        setShowDelete={setShowDelete}
        deletingUser={deletingUser}
        onConfirm={handleConfirmDelete}
      />

      {loading && <Loader />}

      {error && (
        <h2 style={{ textAlign: "center", color: "red" }}>
          {error}
        </h2>
      )}

      {!loading && !error && (
        <>
          {visibleUsers.length === 0 ? (
            <h2 style={{ textAlign: "center" }}>
              No Users Found
            </h2>
          ) : (
            <UserTable
              users={visibleUsers}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            setPageSize={setPageSize}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </>
  );
}

export default App;