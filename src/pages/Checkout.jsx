import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { orderStore } from "../utils/storage";

function CheckoutWithNavigate(props) {
  const navigate = useNavigate();
  return <Checkout {...props} navigate={navigate} />;
}

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { customerName: "", error: "", success: null };
  }

  handleNameChange = (event) => {
    this.setState({ customerName: event.target.value, error: "" });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const name = this.state.customerName.trim();

    if (!name) {
      this.setState({ error: "Please enter your name." });
      return;
    }

    const { cart } = this.props;
    const total = cart.reduce((sum, item) => sum + item.subtotal, 0);

    orderStore.create(name, cart);

    // Keep a snapshot so the popup can still show the order after the cart is cleared
    this.setState({ success: { name, total, items: cart } });
    this.props.clearCart();
  };

  goToOrders = () => {
    this.props.navigate("/orders");
  };

  goToMenu = () => {
    this.props.navigate("/menu");
  };

  render() {
    const { customerName, error, success } = this.state;
    const cart = success ? success.items : this.props.cart;
    const total = cart.reduce((sum, item) => sum + item.subtotal, 0);

    if (cart.length === 0) {
      return (
        <div className="empty-state large">
          <span>🛒</span>
          <h1>Nothing to check out</h1>
          <p>Your cart is empty.</p>
          <Link to="/menu" className="primary-btn">Go to Menu</Link>
        </div>
      );
    }

    return (
      <section>
        <div className="section-heading">
          <div>
            <span className="eyebrow">Checkout</span>
            <h1>Almost There!</h1>
            <p>Enter your name before placing your order.</p>
          </div>
        </div>

        <div className="checkout-layout">
          <form className="checkout-card" onSubmit={this.handleSubmit}>
            <label htmlFor="customerName">Name</label>

            <input
              id="customerName"
              type="text"
              placeholder="e.g. Juan Dela Cruz"
              value={customerName}
              onChange={this.handleNameChange}
              disabled={Boolean(success)}
            />

            {error && <p className="form-error">{error}</p>}

            <button
              type="submit"
              className="primary-btn full-btn"
              disabled={Boolean(success)}
            >
              Place Order
            </button>
          </form>

          <aside className="summary-card">
            <h2>Order Summary</h2>

            {cart.map((item) => (
              <div className="summary-row" key={item.productId}>
                <span>{item.name} × {item.quantity}</span>
                <span>₱{item.subtotal.toFixed(2)}</span>
              </div>
            ))}

            <div className="summary-row total-row">
              <span>Total</span>
              <strong>₱{total.toFixed(2)}</strong>
            </div>
          </aside>
        </div>

        {success && (
          <div className="modal-overlay" onClick={this.goToOrders}>
            <div
              className="confirm-modal success-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="order-success-title"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="success-modal-icon">✓</div>
              <h3 id="order-success-title">Order placed!</h3>
              <p>
                Thank you, {success.name}. Your order has been received and is now pending.
              </p>

              <div className="success-modal-summary">
                <div className="summary-row">
                  <span>Items</span>
                  <span>{success.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="summary-row">
                  <span>Total</span>
                  <strong>₱{success.total.toFixed(2)}</strong>
                </div>
              </div>

              <div className="success-modal-actions">
                <button className="primary-btn full-btn" onClick={this.goToOrders} autoFocus>
                  View My Orders
                </button>
                <button className="success-secondary-btn" onClick={this.goToMenu}>
                  Order More
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default CheckoutWithNavigate;