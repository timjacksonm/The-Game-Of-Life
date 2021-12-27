import React, { useRef, useEffect } from "react";
import "./styles.css";

const Options = ({ setGridValue }) => {
  const slider = useRef();

  return (
    <div className="optionsContainer">
      <div className="label">
        <p>cell count</p>
        <input
          onChange={(e) => {
            setGridValue(e.target.value);
          }}
          ref={slider}
          type="range"
          min="4"
          max="80"
          step="4"
          className="slider"
          id="myRange"
        />
      </div>
      <div className="label">
        <p>speed</p>
        <input type="range" min="1" max="10" />
      </div>
    </div>
  );
};

export default Options;
