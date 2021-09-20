import React from "react";

//Assets
import "./styles/options.css";

export const Options = ({ layout, layoutChange }) => {
  const options = ["Cose", "Dagre", "Grid", "Breadthfirst", "Circle"];
  return (
    <div className="options">
      <div className="firstRow">
        <label>LAYOUT </label>
        <select value={layout} onChange={(e) => layoutChange(e.target.value)}>
          {options.map((option) => (
            <option value={option.toLowerCase()}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
