import React from "react";
import { formatDate, orderStore } from "../utils/storage";

class OrderCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showConfirm: false };
  }

  handleStatusChange = (event) => {
    this.props.onStatusChange(this.props.order.id, event.target.value);
  };

  openConfirm = () => {
    this.setState({ showConfirm: true });
  };

  closeConfirm = () => {
    this.setState({ showConfirm: false });
  };

  confirmDelete = () => {
    this.props.onDelete(this.props.order.id);
    this.setState({ showConfirm: false });
  };

  render() {
    const { order } = this.props;
    const { showConfirm } = this.state;

    return (
      <article className="order-card">
        <div className="order-header">
          <div>
            <small>Order ID</small>
            <h3>{order.id}</h3>
          </div>

          <span className={`status status-${order.status.toLowerCase()}`}>
            {order.status}
          </span>
        </div>

        <div className="order-info">
          <p><strong>Customer:</strong> {order.customerName}</p>
          <p><strong>Date:</strong> {formatDate(order.date)}</p>
        </div>

        <div className="order-items">
          {order.items.map((item) => (
            <div className="order-item" key={item.productId}>
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₱{item.subtotal.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="order-total">
          <span>Total</span>
          <strong>₱{order.total.toFixed(2)}</strong>
        </div>

        <div className="order-actions">
          <div className="order-status-control">
            <label htmlFor={`status-${order.id}`}>Update status</label>
            <select
              id={`status-${order.id}`}
              value={order.status}
              onChange={this.handleStatusChange}
            >
              {orderStore.statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <button className="delete-order-btn" onClick={this.openConfirm}>
            Delete Order
          </button>
        </div>

        {showConfirm && (
          <div className="modal-overlay" onClick={this.closeConfirm}>
            <div className="confirm-modal" onClick={(event) => event.stopPropagation()}>
              <h3>Delete this order?</h3>
              <p>Are you sure you want to delete this order? This action cannot be undone.</p>

              <div className="confirm-modal-actions">
                <button className="confirm-cancel-btn" onClick={this.closeConfirm}>
                  Cancel
                </button>
                <button className="confirm-delete-btn" onClick={this.confirmDelete}>
                  Delete Order
                </button>
              </div>
            </div>
          </div>
        )}
      </article>
    );
  }
}

export default OrderCard;