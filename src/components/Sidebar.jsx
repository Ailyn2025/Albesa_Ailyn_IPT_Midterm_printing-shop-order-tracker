function Sidebar({
  activePage,
  setActivePage,
}) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "▦",
    },
    {
      id: "orders",
      label: "Orders",
      icon: "▤",
    },
  ];

  return (
    <aside className="sidebar">

      <div className="brand">

        <div className="brand-logo">
          P
        </div>

        <div>
          <h2>PrintFlow</h2>
          <span>Order Tracker</span>
        </div>

      </div>

      <nav className="sidebar-nav">

        <p className="nav-title">
          MENU
        </p>

        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${
              activePage === item.id
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage(item.id)
            }
          >
            <span className="nav-icon">
              {item.icon}
            </span>

            <span>
              {item.label}
            </span>
          </button>
        ))}

      </nav>

      <div className="sidebar-bottom">

        <div className="shop-info">

          <div className="shop-avatar">
            PS
          </div>

          <div>
            <strong>
              Printing Shop
            </strong>

            <span>
              Administrator
            </span>
          </div>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;