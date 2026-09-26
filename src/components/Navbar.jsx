import React from "react";
import { NavLink } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    const { cartCount } = this.props;

    return (
      <header className="navbar">
        <div className="nav-inner">
          <NavLink to="/" className="brand">
            <span>KAINAN</span>
          </NavLink>

          <nav>
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/menu">Menu</NavLink>
            <NavLink to="/orders">Orders</NavLink>
            <NavLink to="/cart" className="cart-link">
              Cart <span className="cart-badge">{cartCount}</span>
            </NavLink>
          </nav>
        </div>
      </header>
    );
  }
}

export default Navbar;