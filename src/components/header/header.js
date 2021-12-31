import React from "react";
import "./styles.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const Header = ({ showOptions, setShowOptions }) => {
  return (
    <div className="header">
      <h1 className="title">The Game Of Life</h1>
      <p className="flexColumnCenter noMargin">
        {showOptions ? "Hide options" : "Show options"}
        {showOptions ? (
          <FaAngleUp
            size="1.5em"
            onClick={() => setShowOptions(!showOptions)}
          />
        ) : (
          <FaAngleDown
            size="1.5em"
            onClick={() => setShowOptions(!showOptions)}
          />
        )}
      </p>
    </div>
  );
};

export default Header;
