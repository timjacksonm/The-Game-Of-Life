import React from "react";
import "./styles.css";
const Button = ({ name, action }) => {
  return (
    <>
      <button className="buttonStyle" onClick={action}>
        {name}
      </button>
    </>
  );
};

export default Button;
