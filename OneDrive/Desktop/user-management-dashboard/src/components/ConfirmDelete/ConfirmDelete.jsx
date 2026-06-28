import "./ConfirmDelete.css";

function ConfirmDelete({
  showDelete,
  setShowDelete,
  onConfirm,
  deletingUser,
}) {
  if (!showDelete) return null;

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal">

        <h2>Delete User</h2>

        <p>
          Are you sure you want to delete
          <strong>
            {" "}
            {deletingUser?.firstName} {deletingUser?.lastName}
          </strong>
          ?
        </p>

        <div className="delete-buttons">
          <button
            className="delete-btn"
            onClick={onConfirm}
          >
            Delete
          </button>

          <button
            className="cancel-btn"
            onClick={() => setShowDelete(false)}
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

export default ConfirmDelete;