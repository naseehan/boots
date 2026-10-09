import './admin.css';

/**
 * ConfirmDialog — accessible modal overlay for destructive actions.
 *
 * Props:
 *   isOpen    {boolean}  — controls visibility
 *   title     {string}   — dialog heading
 *   message   {string}   — descriptive body text
 *   onConfirm {function} — called when user confirms
 *   onCancel  {function} — called when user cancels / closes
 *   isLoading {boolean}  — disables buttons and shows spinner on confirm
 */
function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, isLoading }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    // Close if clicking the dark backdrop, not the dialog box itself
    if (e.target === e.currentTarget && !isLoading) {
      onCancel();
    }
  };

  return (
    <div
      className="confirm-dialog-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-message"
      onClick={handleOverlayClick}
    >
      <div className="confirm-dialog">
        <h2 id="confirm-dialog-title" className="confirm-dialog-title">
          {title || 'Are you sure?'}
        </h2>
        <p id="confirm-dialog-message" className="confirm-dialog-message">
          {message || 'This action cannot be undone.'}
        </p>
        <div className="confirm-dialog-actions">
          <button
            className="admin-btn admin-btn-secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="admin-btn admin-btn-danger"
            onClick={onConfirm}
            disabled={isLoading}
            autoFocus
          >
            {isLoading ? (
              <>
                <span className="admin-btn-spinner" style={{ borderTopColor: '#fff', borderColor: 'rgba(255,255,255,0.3)' }} />
                Deleting…
              </>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
