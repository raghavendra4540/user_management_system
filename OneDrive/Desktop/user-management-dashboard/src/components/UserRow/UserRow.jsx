function UserRow({ user, onEdit, onDelete }) {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.department}</td>

      <td>
        <button onClick={() => onEdit(user)}>Edit</button>

        <button
          style={{ marginLeft: "8px" }}
          onClick={() => onDelete(user)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default UserRow;