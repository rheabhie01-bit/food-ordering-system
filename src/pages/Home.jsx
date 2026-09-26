import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <section>
        <div className="hero">
          <div>
            <span className="eyebrow">Home style Filipino • Simple • Delicious</span>
            <h1>Your Favorite Filipino Dishes, Just A Click Away.</h1>
            <p>
              Craving adobo, sinigang, or a cold halo-halo? Browse the menu, add what you like to your cart, and place your order in just a few clicks.
            </p>
            <Link to="/menu" className="primary-btn">
              Browse the Menu →
            </Link>
          </div>
        </div>

        <div className="features">
          <div>
            <h3>Filipino Favorites</h3>
            <p>From savory adobo and kare-kare to sweet turon and halo-halo, every dish is a familiar taste of home.</p>
          </div>

          <div>
            <h3>Easy Ordering</h3>
            <p>Pick your dishes, adjust the quantities in your cart, and check out in a few simple steps.</p>
          </div>

          <div>
            <h3>Track Your Orders</h3>
            <p>Every order you place shows up on the Orders page with its status and total, so you always know where things stand.</p>
          </div>
        </div>
      </section>
    );
  }
}

export default Home;