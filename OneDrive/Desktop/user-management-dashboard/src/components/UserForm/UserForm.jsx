import { useEffect, useState } from "react";
import "./UserForm.css";

function UserForm({
  showForm,
  setShowForm,
  onSave,
  editingUser,
}) {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    department: "IT",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser);
    } else {
      setFormData(initialState);
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid Email";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSave(formData);

    setShowForm(false);

    setFormData(initialState);
  };

  if (!showForm) return null;

  return (
    <div className="modal">

      <form className="form" onSubmit={handleSubmit}>

        <h2>
          {editingUser ? "Edit User" : "Add User"}
        </h2>

        <input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <p>{errors.firstName}</p>

        <input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <p>{errors.lastName}</p>

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <p>{errors.email}</p>

        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
        >
          <option>IT</option>
          <option>HR</option>
          <option>Sales</option>
          <option>Finance</option>
        </select>

        <div className="buttons">
          <button type="submit">
            Save
          </button>

          <button
            type="button"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}

export default UserForm;