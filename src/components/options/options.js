import React, { useRef, useEffect } from "react";

const Options = ({ setGridValue }) => {
  const slider = useRef();

  return (
    <div>
      <input
        onChange={(e) => {
          setGridValue(e.target.value);
        }}
        ref={slider}
        type="range"
        min="100"
        max="1000"
        className="slider"
        id="myRange"
      />
    </div>
  );
};

export default Options;
