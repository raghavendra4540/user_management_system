import "./UserTable.css";
import UserRow from "../UserRow/UserRow";

function UserTable({ users, onEdit, onDelete }) {
  return (
    <div className="table-container">
      <table>

        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default UserTable;