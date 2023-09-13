import React, { useState } from "react";
import Draggable from "react-draggable";

export default function FloatingWindow({
  positions,
  header,
  size,
  setSelectedNode = () => {},
  children,
}) {
  const [position, setPosition] = useState(positions);
  //y: infoNode.selectedNode.y,
  const handleDrag = (e, data) => {
    const { x, y } = data;
    console.log(position);
    setPosition({ x, y });
  };

  return (
    <Draggable handle=".header" defaultPosition={position} onDrag={handleDrag}>
      <div
        style={{
          zIndex: 999999,
          backgroundColor: "#FFF",
          width: size.width,
          height: size.height,
          border: "1px solid darkgray",
          position: "absolute",
          overflow: "auto",
        }}
      >
        <div
          className="header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: header.border ? header.border : "none",
            backgroundColor: header.color,
            cursor: "move",
            margin: header.margin ? header.margin : "none",
          }}
        >
          <h2 style={{ marginLeft: "35%" }}>{header.title}</h2>
          <button
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              border: "1px solid black",
              backgroundColor: "transparent",
              color: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              marginRight: "10px",
            }}
            onClick={(e) => {
              setSelectedNode(false);
            }}
          >
            X
          </button>
        </div>
        {children}
      </div>
    </Draggable>
  );
}
