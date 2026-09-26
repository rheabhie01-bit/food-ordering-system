import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <p>© {new Date().getFullYear()} Pinoy Taste KAINAN</p>
      </footer>
    );
  }
}

export default Footer;