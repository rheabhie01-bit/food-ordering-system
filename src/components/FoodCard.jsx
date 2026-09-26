import React from "react";

class FoodCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageFailed: false };
  }

  static getImageSrc(link) {
    if (!link) return "";

    const isPinterestPage =
      link.includes("pin.it") || link.includes("pinterest.com/pin");

    if (isPinterestPage) {
      return (
        "https://api.microlink.io/?url=" +
        encodeURIComponent(link) +
        "&embed=image.url"
      );
    }

    return link;
  }

  handleImageError = () => {
    this.setState({ imageFailed: true });
  };

  render() {
    const { food, addToCart } = this.props;

    const imageSrc = FoodCard.getImageSrc(food.image);
    const showPlaceholder = !imageSrc || this.state.imageFailed;

    return (
      <article className="food-card">
        {showPlaceholder ? (
          <div className="image-fallback">
            <p>{food.name}</p>
          </div>
        ) : (
          <img
            src={imageSrc}
            alt={food.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={this.handleImageError}
          />
        )}

        <div className="food-card-body">
          <div className="food-top">
            <span className="category-badge">{food.category}</span>
            <strong>₱{food.price.toFixed(2)}</strong>
          </div>

          <h3>{food.name}</h3>

          <button
            className="primary-btn full-btn"
            onClick={() => addToCart(food)}
          >
            Add to Cart
          </button>
        </div>
      </article>
    );
  }
}

export default FoodCard;