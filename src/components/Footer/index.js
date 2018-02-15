import React from "react";
import "./index.css";

export const Footer = () => {
  return (
    <div className="Footer">
      <span className="Footer__source">
        <a href="https://github.com/carlosbaraza/game-of-life">
          Source code (GitHub)
        </a>
      </span>
      <span className="Footer__made-by">
        Made with ♥ by <a href="http://www.carlosbaraza.com">Carlos Baraza</a>
      </span>
    </div>
  );
};
