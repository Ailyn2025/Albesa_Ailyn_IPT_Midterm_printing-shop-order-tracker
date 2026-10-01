import { useMemo, useState } from "react";

function OrderTable({
  orders,
  onEdit,
  onDelete,
  onStatusChange,
  onNewOrder,
}) {
  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("dateNeeded");

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (search.trim()) {
      const searchValue =
        search.toLowerCase();

      result = result.filter(
        (order) =>
          order.customer
            .toLowerCase()
            .includes(searchValue) ||
          order.jobType
            .toLowerCase()
            .includes(searchValue)
      );
    }

    if (statusFilter !== "All") {
      result = result.filter(
        (order) =>
          order.status === statusFilter
      );
    }

    result.sort((a, b) => {
      if (sortBy === "customer") {
        return a.customer.localeCompare(
          b.customer
        );
      }

      if (sortBy === "copies") {
        return (
          Number(b.copies) -
          Number(a.copies)
        );
      }

      return (
        new Date(
          a.dateNeeded || 0
        ) -
        new Date(
          b.dateNeeded || 0
        )
      );
    });

    return result;
  }, [
    orders,
    search,
    statusFilter,
    sortBy,
  ]);

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  return (
    <div className="orders-page">

      <div className="page-header">

        <div>
          <h1>
            Orders
          </h1>

          <p>
            Manage all printing shop orders.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={onNewOrder}
        >
          + New Order
        </button>

      </div>

      <div className="orders-card">

        <div className="orders-toolbar">

          <div className="search-box">

            <span>
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search customer or job type..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />

          </div>

          <div className="toolbar-actions">

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
            >
              <option value="All">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Ready">
                Ready
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="Cancelled">
                Cancelled
              </option>
            </select>

            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(
                  event.target.value
                )
              }
            >
              <option value="dateNeeded">
                Sort: Date Needed
              </option>

              <option value="customer">
                Sort: Customer
              </option>

              <option value="copies">
                Sort: Copies
              </option>
            </select>

          </div>

        </div>

        {filteredOrders.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              ⌕
            </div>

            <h3>
              No orders found
            </h3>

            <p>
              {orders.length === 0
                ? "There are no orders yet."
                : "Try changing your search or filter."}
            </p>

            {orders.length === 0 && (
              <button
                className="primary-button"
                onClick={onNewOrder}
              >
                + Create Order
              </button>
            )}

          </div>

        ) : (

          <div className="table-container">

            <table className="orders-table">

              <thead>

                <tr>
                  <th>
                    Customer
                  </th>

                  <th>
                    Job Type
                  </th>

                  <th>
                    Copies
                  </th>

                  <th>
                    Date Needed
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Actions
                  </th>
                </tr>

              </thead>

              <tbody>

                {filteredOrders.map(
                  (order) => (

                    <tr
                      key={order.id}
                    >

                      <td>

                        <div className="customer-cell">

                          <div className="customer-avatar">
                            {order.customer
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>

                            <strong>
                              {order.customer}
                            </strong>

                            {order.notes && (
                              <small>
                                {order.notes}
                              </small>
                            )}

                          </div>

                        </div>

                      </td>

                      <td>
                        <span className="job-type">
                          {order.jobType}
                        </span>
                      </td>

                      <td>
                        <strong>
                          {Number(
                            order.copies
                          ).toLocaleString()}
                        </strong>
                      </td>

                      <td>
                        {formatDate(
                          order.dateNeeded
                        )}
                      </td>

                      <td>

                        <select
                          className={`status-select ${order.status
                            .toLowerCase()
                            .replace(
                              /\s+/g,
                              "-"
                            )}`}
                          value={
                            order.status
                          }
                          onChange={(event) =>
                            onStatusChange(
                              order.id,
                              event.target.value
                            )
                          }
                        >

                          <option value="Pending">
                            Pending
                          </option>

                          <option value="In Progress">
                            In Progress
                          </option>

                          <option value="Ready">
                            Ready
                          </option>

                          <option value="Completed">
                            Completed
                          </option>

                          <option value="Cancelled">
                            Cancelled
                          </option>

                        </select>

                      </td>

                      <td>

                        <div className="action-buttons">

                          <button
                            className="icon-button edit"
                            title="Edit order"
                            onClick={() =>
                              onEdit(order)
                            }
                          >
                            ✎
                          </button>

                          <button
                            className="icon-button delete"
                            title="Delete order"
                            onClick={() =>
                              onDelete(order)
                            }
                          >
                            🗑
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

        {filteredOrders.length > 0 && (
          <div className="table-footer">

            Showing{" "}
            <strong>
              {filteredOrders.length}
            </strong>{" "}
            of{" "}
            <strong>
              {orders.length}
            </strong>{" "}
            orders

          </div>
        )}

      </div>

    </div>
  );
}

export default OrderTable;