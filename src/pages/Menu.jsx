import React from "react";
import { Link } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import { foodStore } from "../utils/storage";

const popupStyle = {
  position: "fixed",
  top: "92px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  gap: "12px",
  maxWidth: "calc(100% - 32px)",
  padding: "14px 20px",
  borderRadius: "12px",
  background: "#242424",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: 600,
  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.25)",
};

const checkStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: "22px",
  height: "22px",
  borderRadius: "50%",
  background: "#3fa96b",
  fontSize: "12px",
};

const linkStyle = {
  paddingLeft: "12px",
  borderLeft: "1px solid rgba(255, 255, 255, 0.3)",
  color: "#9be0b7",
  fontWeight: 700,
  whiteSpace: "nowrap",
};

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      foods: foodStore.getAll(),
      category: "All",
      search: "",
      notice: null,
    };

    this.noticeTimer = null;
  }

  componentWillUnmount() {
    clearTimeout(this.noticeTimer);
  }

  handleAddToCart = (food) => {
    this.props.addToCart(food);

    clearTimeout(this.noticeTimer);
    this.setState({
      notice: { id: Date.now(), text: `${food.name} was added to your cart.` },
    });
    this.noticeTimer = setTimeout(() => this.setState({ notice: null }), 2500);
  };

  handleCategoryClick = (category) => {
    this.setState({ category });
  };

  handleSearchChange = (event) => {
    this.setState({ search: event.target.value });
  };

  getFilteredFood() {
    const { foods, category, search } = this.state;

    return foods.filter((food) => {
      const categoryMatch = category === "All" || food.category === category;
      const searchMatch = food.name.toLowerCase().includes(search.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }

  render() {
    const { foods, category, search, notice } = this.state;

    const categories = ["All", ...new Set(foods.map((food) => food.category))];
    const filteredFood = this.getFilteredFood();

    return (
      <section>
        {notice && (
          <div key={notice.id} style={popupStyle} role="status" aria-live="polite">
            <span style={checkStyle}>✓</span>
            <span>{notice.text}</span>
            <Link to="/cart" style={linkStyle}>View cart</Link>
          </div>
        )}

        <div className="section-heading">
          <div>
            <span className="eyebrow">Menu</span>
            <h1>Filipino Favorites</h1>
            <p>Pick what you're craving and add it to your cart.</p>
          </div>

          <input
            className="search-input"
            type="search"
            placeholder="Search for a dish..."
            value={search}
            onChange={this.handleSearchChange}
          />
        </div>

        <div className="category-tabs">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => this.handleCategoryClick(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {filteredFood.length === 0 ? (
          <div className="empty-state">
            <span>🔎</span>
            <h2>No dishes found</h2>
            <p>Try a different name or category.</p>
          </div>
        ) : (
          <div className="food-grid">
            {filteredFood.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                addToCart={this.handleAddToCart}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default Menu;