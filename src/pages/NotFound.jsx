import React from "react";
import { Link } from "react-router-dom";

class NotFound extends React.Component {
  render() {
    return (
      <div className="empty-state large">
        <h1>Page not found</h1>
        <p>Looks like you took a wrong turn. Let's head back home.</p>
        <Link to="/" className="primary-btn">Go Home</Link>
      </div>
    );
  }
}

export default NotFound;