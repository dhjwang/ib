import React from "react";
import "./button.css";

const Button = ({ name, onclick }) => {
  return (
    <div className="btn" onClick={onclick}>
      {name}
    </div>
  );
};

export default Button;
