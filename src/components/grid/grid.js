import React from "react";
import "./styles.css";

const Grid = ({ gridValue }) => {
  return (
    <div
      className="container"
      style={{
        gridTemplateColumns: `repeat(${gridValue}, 1fr)`,
        gridTemplateRows: `repeat(${gridValue}, 1fr)`,
      }}
    >
      {Array.from({ length: gridValue * gridValue }).map((cell, index) => {
        return <div className="cell" key={index} id={index}></div>;
      })}
    </div>
  );
};

export default Grid;
