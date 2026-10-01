import { useEffect, useState } from "react";

const jobTypes = [
  "Document Printing",
  "Photo Printing",
  "Flyer",
  "Poster",
  "Business Card",
  "Invitation",
  "Thesis / Booklet",
  "Tarpaulin",
  "Other",
];

const statuses = [
  "Pending",
  "In Progress",
  "Ready",
  "Completed",
  "Cancelled",
];

function OrderForm({
  isOpen,
  onClose,
  onSubmit,
  editingOrder,
}) {
  const [formData, setFormData] = useState({
    customer: "",
    jobType: "Document Printing",
    copies: 1,
    dateNeeded: "",
    status: "Pending",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingOrder) {
      setFormData({
        customer:
          editingOrder.customer || "",
        jobType:
          editingOrder.jobType ||
          "Document Printing",
        copies:
          editingOrder.copies || 1,
        dateNeeded:
          editingOrder.dateNeeded || "",
        status:
          editingOrder.status || "Pending",
        notes:
          editingOrder.notes || "",
      });
    } else {
      setFormData({
        customer: "",
        jobType: "Document Printing",
        copies: 1,
        dateNeeded: "",
        status: "Pending",
        notes: "",
      });
    }

    setErrors({});
  }, [editingOrder, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.customer.trim()) {
      newErrors.customer =
        "Customer name is required.";
    }

    if (!formData.jobType) {
      newErrors.jobType =
        "Please select a job type.";
    }

    if (
      !formData.copies ||
      Number(formData.copies) < 1
    ) {
      newErrors.copies =
        "Copies must be at least 1.";
    }

    if (!formData.dateNeeded) {
      newErrors.dateNeeded =
        "Date needed is required.";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors =
      validate();

    if (
      Object.keys(validationErrors).length > 0
    ) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      ...formData,
      customer:
        formData.customer.trim(),
      copies:
        Number(formData.copies),
    });
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={onClose}
    >

      <div
        className="modal"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >

        <div className="modal-header">

          <div>
            <h2>
              {editingOrder
                ? "Edit Order"
                : "Create New Order"}
            </h2>

            <p>
              {editingOrder
                ? "Update the order information below."
                : "Enter the details for the new printing order."}
            </p>
          </div>

          <button
            className="close-button"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="form-group full-width">

              <label htmlFor="customer">
                Customer Name{" "}
                <span>*</span>
              </label>

              <input
                id="customer"
                name="customer"
                type="text"
                placeholder="Enter customer name"
                value={formData.customer}
                onChange={handleChange}
              />

              {errors.customer && (
                <small className="form-error">
                  {errors.customer}
                </small>
              )}

            </div>

            <div className="form-group">

              <label htmlFor="jobType">
                Job Type{" "}
                <span>*</span>
              </label>

              <select
                id="jobType"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
              >
                {jobTypes.map((job) => (
                  <option
                    key={job}
                    value={job}
                  >
                    {job}
                  </option>
                ))}
              </select>

              {errors.jobType && (
                <small className="form-error">
                  {errors.jobType}
                </small>
              )}

            </div>

            <div className="form-group">

              <label htmlFor="copies">
                Number of Copies{" "}
                <span>*</span>
              </label>

              <input
                id="copies"
                name="copies"
                type="number"
                min="1"
                value={formData.copies}
                onChange={handleChange}
              />

              {errors.copies && (
                <small className="form-error">
                  {errors.copies}
                </small>
              )}

            </div>

            <div className="form-group">

              <label htmlFor="dateNeeded">
                Date Needed{" "}
                <span>*</span>
              </label>

              <input
                id="dateNeeded"
                name="dateNeeded"
                type="date"
                value={
                  formData.dateNeeded
                }
                onChange={handleChange}
              />

              {errors.dateNeeded && (
                <small className="form-error">
                  {errors.dateNeeded}
                </small>
              )}

            </div>

            <div className="form-group">

              <label htmlFor="status">
                Status
              </label>

              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                {statuses.map((status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                ))}
              </select>

            </div>

            <div className="form-group full-width">

              <label htmlFor="notes">
                Notes
              </label>

              <textarea
                id="notes"
                name="notes"
                rows="4"
                placeholder="Additional instructions or notes..."
                value={formData.notes}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="modal-footer">

            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
            >
              {editingOrder
                ? "Save Changes"
                : "Add Order"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default OrderForm;