function Dashboard({
  orders,
  onNewOrder,
}) {
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const inProgressOrders = orders.filter(
    (order) => order.status === "In Progress"
  ).length;

  const readyOrders = orders.filter(
    (order) => order.status === "Ready"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  ).length;

  const totalCopies = orders.reduce(
    (total, order) =>
      total + Number(order.copies || 0),
    0
  );

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: "▤",
      className: "blue",
    },

    {
      title: "Pending",
      value: pendingOrders,
      icon: "◷",
      className: "orange",
    },

    {
      title: "In Progress",
      value: inProgressOrders,
      icon: "↻",
      className: "purple",
    },

    {
      title: "Ready",
      value: readyOrders,
      icon: "✓",
      className: "green",
    },
  ];

  return (
    <div className="dashboard-page">

      <div className="page-header">

        <div>
          <h1>
            Dashboard
          </h1>

          <p>
            Overview of your printing shop orders.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={onNewOrder}
        >
          + New Order
        </button>

      </div>

      <div className="stats-grid">

        {stats.map((stat) => (
          <div
            className="stat-card"
            key={stat.title}
          >

            <div
              className={`stat-icon ${stat.className}`}
            >
              {stat.icon}
            </div>

            <div className="stat-content">

              <span>
                {stat.title}
              </span>

              <strong>
                {stat.value}
              </strong>

            </div>

          </div>
        ))}

      </div>

      <div className="dashboard-secondary">

        <div className="summary-card">

          <div className="summary-header">

            <h2>
              Order Summary
            </h2>

            <p>
              Current printing activity
            </p>

          </div>

          <div className="summary-list">

            <div className="summary-item">
              <span className="summary-label">
                <span className="dot orange"></span>
                Pending Orders
              </span>

              <strong>
                {pendingOrders}
              </strong>
            </div>

            <div className="summary-item">
              <span className="summary-label">
                <span className="dot purple"></span>
                In Progress
              </span>

              <strong>
                {inProgressOrders}
              </strong>
            </div>

            <div className="summary-item">
              <span className="summary-label">
                <span className="dot green"></span>
                Ready
              </span>

              <strong>
                {readyOrders}
              </strong>
            </div>

            <div className="summary-item">
              <span className="summary-label">
                <span className="dot blue"></span>
                Completed
              </span>

              <strong>
                {completedOrders}
              </strong>
            </div>

          </div>

        </div>

        <div className="summary-card">

          <div className="summary-header">

            <h2>
              Printing Volume
            </h2>

            <p>
              Total copies from all orders
            </p>

          </div>

          <div className="volume-number">
            {totalCopies.toLocaleString()}
          </div>

          <span className="volume-label">
            Total Copies
          </span>

        </div>

      </div>

      <div className="recent-orders-card">

        <div className="card-header">

          <h2>
            Recent Orders
          </h2>

          <p>
            Latest orders in your shop
          </p>

        </div>

        {orders.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              ▤
            </div>

            <h3>
              No orders yet
            </h3>

            <p>
              Create your first printing order.
            </p>

            <button
              className="primary-button"
              onClick={onNewOrder}
            >
              + Create Order
            </button>

          </div>

        ) : (

          <div className="recent-orders-list">

            {orders
              .slice()
              .sort(
                (a, b) =>
                  new Date(
                    b.createdAt ||
                      b.dateNeeded
                  ) -
                  new Date(
                    a.createdAt ||
                      a.dateNeeded
                  )
              )
              .slice(0, 5)
              .map((order) => (

                <div
                  className="recent-order"
                  key={order.id}
                >

                  <div className="recent-order-info">

                    <strong>
                      {order.customer}
                    </strong>

                    <span>
                      {order.jobType}
                    </span>

                  </div>

                  <div className="recent-order-details">

                    <span>
                      {order.copies} copies
                    </span>

                    <span
                      className={`status-badge ${order.status
                        .toLowerCase()
                        .replace(
                          /\s+/g,
                          "-"
                        )}`}
                    >
                      {order.status}
                    </span>

                  </div>

                </div>

              ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Dashboard;