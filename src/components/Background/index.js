import React from "react";
import background from "./background.jpg";
import "./index.css";

export const Background = () => {
  return (
    <div className="Background">
      <img className="Background__img" src={background} />
    </div>
  );
};
