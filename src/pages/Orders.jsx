import React from "react";
import { Link } from "react-router-dom";
import OrderCard from "../components/OrderCard";
import { orderStore } from "../utils/storage";

function sortOldestFirst(orders) {
  const idNumber = (order) => parseInt(String(order.id).replace(/\D/g, ""), 10);

  return [...orders].sort((a, b) => {
    const numA = idNumber(a);
    const numB = idNumber(b);

    if (!Number.isNaN(numA) && !Number.isNaN(numB) && numA !== numB) {
      return numA - numB;
    }

    return new Date(a.date) - new Date(b.date);
  });
}

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orders: [], statusFilter: "All" };
  }

  componentDidMount() {
    this.setState({ orders: orderStore.getAll() });
  }

  handleStatusChange = (orderId, status) => {
    this.setState({ orders: orderStore.updateStatus(orderId, status) });
  };

  handleDeleteOrder = (orderId) => {
    this.setState({ orders: orderStore.delete(orderId) });
  };

  handleFilterClick = (status) => {
    this.setState({ statusFilter: status });
  };

  getFilteredOrders() {
    const { orders, statusFilter } = this.state;

    const sortedOrders = sortOldestFirst(orders);

    if (statusFilter === "All") return sortedOrders;

    return sortedOrders.filter((order) => order.status === statusFilter);
  }

  render() {
    const { orders, statusFilter } = this.state;
    const filters = ["All", ...orderStore.statuses];
    const filteredOrders = this.getFilteredOrders();

    const activeOrders = filteredOrders.filter(
      (order) => order.status !== "Completed" && order.status !== "Cancelled"
    );
    const completedOrders = filteredOrders.filter(
      (order) => order.status === "Completed"
    );
    const cancelledOrders = filteredOrders.filter(
      (order) => order.status === "Cancelled"
    );

    return (
      <section>
        <div className="section-heading">
          <div>
            <span className="eyebrow">Order History</span>
            <h1>Your Orders</h1>
            <p>All the orders you've placed will show up here.</p>
          </div>
        </div>

        {orders.length > 0 && (
          <div className="category-tabs">
            {filters.map((status) => (
              <button
                key={status}
                className={statusFilter === status ? "active" : ""}
                onClick={() => this.handleFilterClick(status)}
              >
                {status}
              </button>
            ))}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="empty-state large">
            <span>📦</span>
            <h2>No orders yet</h2>
            <p>Once you place an order, it will appear here.</p>
            <Link to="/menu" className="primary-btn">Order Now</Link>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="empty-state">
            <span>🔎</span>
            <h2>No orders found</h2>
            <p>Try a different status filter.</p>
          </div>
        ) : (
          <>
            {activeOrders.length > 0 && (
              <div className="orders-list">
                {activeOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onStatusChange={this.handleStatusChange}
                    onDelete={this.handleDeleteOrder}
                  />
                ))}
              </div>
            )}

            {completedOrders.length > 0 && (
              <div className="orders-list">
                {activeOrders.length > 0 && <h3>Completed Orders</h3>}

                {completedOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onStatusChange={this.handleStatusChange}
                    onDelete={this.handleDeleteOrder}
                  />
                ))}
              </div>
            )}

            {cancelledOrders.length > 0 && (
              <div className="orders-list">
                {(activeOrders.length > 0 || completedOrders.length > 0) && (
                  <h3>Cancelled Orders</h3>
                )}

                {cancelledOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onStatusChange={this.handleStatusChange}
                    onDelete={this.handleDeleteOrder}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    );
  }
}

export default Orders;