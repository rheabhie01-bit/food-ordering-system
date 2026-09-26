import React from "react";

class CartItem extends React.Component {
  handleDecrease = () => {
    this.props.updateQuantity(this.props.item.productId, -1);
  };

  handleIncrease = () => {
    this.props.updateQuantity(this.props.item.productId, 1);
  };

  handleRemove = () => {
    this.props.removeFromCart(this.props.item.productId);
  };

  render() {
    const { item } = this.props;

    return (
      <div className="cart-item">
        <div>
          <h3>{item.name}</h3>
          <p>₱{item.price.toFixed(2)} each</p>
        </div>

        <div className="quantity-control">
          <button onClick={this.handleDecrease}>−</button>
          <span>{item.quantity}</span>
          <button onClick={this.handleIncrease}>+</button>
        </div>

        <strong>₱{item.subtotal.toFixed(2)}</strong>

        <button className="remove-btn" onClick={this.handleRemove}>
          Remove
        </button>
      </div>
    );
  }
}

export default CartItem;