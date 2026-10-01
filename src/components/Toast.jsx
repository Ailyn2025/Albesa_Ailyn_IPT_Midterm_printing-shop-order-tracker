function Toast({
  toast,
  onClose,
}) {
  if (!toast) {
    return null;
  }

  return (
    <div
      className={`toast toast-${
        toast.type || "success"
      }`}
    >

      <div className="toast-icon">
        {toast.type === "error"
          ? "!"
          : "✓"}
      </div>

      <div className="toast-content">

        <strong>
          {toast.type === "error"
            ? "Error"
            : "Success"}
        </strong>

        <span>
          {toast.message}
        </span>

      </div>

      <button
        className="toast-close"
        onClick={onClose}
      >
        ×
      </button>

    </div>
  );
}

export default Toast;