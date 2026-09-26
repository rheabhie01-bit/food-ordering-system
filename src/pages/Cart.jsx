import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";

function CartWithNavigate(props) {
  const navigate = useNavigate();
  return <Cart {...props} navigate={navigate} />;
}

class Cart extends React.Component {
  handleCheckout = () => {
    this.props.navigate("/checkout");
  };

  render() {
    const { cart, updateQuantity, removeFromCart } = this.props;
    const total = cart.reduce((sum, item) => sum + item.subtotal, 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cart.length === 0) {
      return (
        <div className="empty-state large">
          <span>🛒</span>
          <h1>Your cart is empty</h1>
          <p>Pick something delicious from the menu to get started.</p>
          <Link to="/menu" className="primary-btn">Browse the Menu</Link>
        </div>
      );
    }

    return (
      <section>
        <div className="section-heading">
          <div>
            <span className="eyebrow">Cart</span>
            <h1>Your Order</h1>
            <p>
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart.
            </p>
          </div>
        </div>

        <div className="cart-layout">
          <div className="cart-list">
            {cart.map((item) => (
              <CartItem
                key={item.productId}
                item={item}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>

          <aside className="summary-card">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Items</span>
              <span>{itemCount}</span>
            </div>

            <div className="summary-row total-row">
              <span>Total</span>
              <strong>₱{total.toFixed(2)}</strong>
            </div>

            <button className="primary-btn full-btn" onClick={this.handleCheckout}>
              Proceed to Checkout
            </button>
          </aside>
        </div>
      </section>
    );
  }
}

export default CartWithNavigate;