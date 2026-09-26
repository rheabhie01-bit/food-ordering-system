import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";
import { cartStore } from "./utils/storage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cart: cartStore.getAll() };
  }

  componentDidMount() {
    cartStore.save(this.state.cart);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cart !== this.state.cart) {
      cartStore.save(this.state.cart);
    }
  }

  addToCart = (food) => {
    this.setState((current) => ({
      cart: cartStore.addFood(current.cart, food),
    }));
  };

  updateQuantity = (productId, change) => {
    this.setState((current) => ({
      cart: cartStore.changeQuantity(current.cart, productId, change),
    }));
  };

  removeFromCart = (productId) => {
    this.setState((current) => ({
      cart: cartStore.remove(current.cart, productId),
    }));
  };

  clearCart = () => {
    this.setState({ cart: [] });
  };

  render() {
    const { cart } = this.state;
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
      <>
        <Header cartCount={cartCount} />

        <main className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/menu"
              element={<Menu addToCart={this.addToCart} />}
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  updateQuantity={this.updateQuantity}
                  removeFromCart={this.removeFromCart}
                />
              }
            />
            <Route
              path="/checkout"
              element={<Checkout cart={cart} clearCart={this.clearCart} />}
            />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </>
    );
  }
}

export default App;