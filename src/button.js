import React from "react";
import "./button.css";

const Button = ({ name, onclick }) => {
  return (
    <button className="btn" onClick={onclick}>
      {name}
    </button>
  );
};

export default Button;
