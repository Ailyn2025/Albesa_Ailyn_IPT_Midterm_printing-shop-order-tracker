import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import OrderTable from "./components/OrderTable";
import OrderForm from "./components/OrderForm";
import Toast from "./components/Toast";

import sampleOrders from "./data/sampleOrders";

const STORAGE_KEY = "printing-shop-orders";

function App() {
  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem(STORAGE_KEY);

      if (savedOrders) {
        return JSON.parse(savedOrders);
      }

      return sampleOrders;
    } catch (error) {
      console.error("Error loading orders:", error);
      return sampleOrders;
    }
  });

  const [activePage, setActivePage] = useState("dashboard");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [toast, setToast] = useState(null);

  // Save orders to browser storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  // Hide toast automatically
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
    });
  };

  // Open empty form
  const handleNewOrder = () => {
    setEditingOrder(null);
    setIsFormOpen(true);
  };

  // Close form
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingOrder(null);
  };

  // CREATE
  const handleAddOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      customer: orderData.customer,
      jobType: orderData.jobType,
      copies: Number(orderData.copies),
      dateNeeded: orderData.dateNeeded,
      status: orderData.status,
      notes: orderData.notes || "",
      createdAt: new Date().toISOString(),
    };

    setOrders((previousOrders) => [
      newOrder,
      ...previousOrders,
    ]);

    handleCloseForm();

    showToast("Order added successfully!");
  };

  // Open edit form
  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setIsFormOpen(true);
  };

  // UPDATE
  const handleUpdateOrder = (orderData) => {
    if (!editingOrder) return;

    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        order.id === editingOrder.id
          ? {
              ...order,
              customer: orderData.customer,
              jobType: orderData.jobType,
              copies: Number(orderData.copies),
              dateNeeded: orderData.dateNeeded,
              status: orderData.status,
              notes: orderData.notes || "",
            }
          : order
      )
    );

    handleCloseForm();

    showToast("Order updated successfully!");
  };

  const handleSubmitOrder = (orderData) => {
    if (editingOrder) {
      handleUpdateOrder(orderData);
    } else {
      handleAddOrder(orderData);
    }
  };

  // DELETE
  const handleDeleteOrder = (order) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the order for "${order.customer}"?`
    );

    if (!confirmed) return;

    setOrders((previousOrders) =>
      previousOrders.filter(
        (item) => item.id !== order.id
      )
    );

    showToast("Order deleted successfully!");
  };

  // UPDATE STATUS
  const handleStatusChange = (orderId, newStatus) => {
    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
            }
          : order
      )
    );

    showToast("Order status updated!");
  };

  // PAGE
  const renderPage = () => {
    if (activePage === "orders") {
      return (
        <OrderTable
          orders={orders}
          onEdit={handleEditOrder}
          onDelete={handleDeleteOrder}
          onStatusChange={handleStatusChange}
          onNewOrder={handleNewOrder}
        />
      );
    }

    return (
      <Dashboard
        orders={orders}
        onNewOrder={handleNewOrder}
      />
    );
  };

  return (
    <div className="app">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main-content">

        <header className="topbar">

          <div className="mobile-brand">
            <div className="brand-logo">
              P
            </div>

            <div>
              <strong>PrintFlow</strong>
              <span>Order Tracker</span>
            </div>
          </div>

          <div className="topbar-right">
            <span className="admin-label">
              Administrator
            </span>

            <div className="profile-avatar">
              A
            </div>
          </div>

        </header>

        <section className="content">
          {renderPage()}
        </section>

      </main>

      <OrderForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitOrder}
        editingOrder={editingOrder}
      />

      <Toast
        toast={toast}
        onClose={() => setToast(null)}
      />

    </div>
  );
}

export default App;