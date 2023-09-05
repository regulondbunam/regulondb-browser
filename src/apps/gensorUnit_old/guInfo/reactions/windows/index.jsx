import FloatingWindow from "./FloatingWindow";
import React, { useState } from "react";

export default function Windows({ infoNode, setSelectedNode = () => {} }) {
  const [showComponents, setShowComponents] = useState(false);
  let positions = { x: infoNode.selectedNode.x, y: infoNode.selectedNode.y };

  const styleTitulos = {
    textAlign: "center",
    border: "1px solid #999999",
    backgroundColor: "#D5E2EA",
  };
  const styleColumnas = {
    paddingLeft: "2%",
    borderBottom: "1px solid #C4C4C4",
  };
  return (
    <>
      {showComponents && (
        <FloatingWindow
          positions={{ x: positions.x - 300, y: positions.y + 70 }}
          header={{ title: "Components:", color: "#FFFF", margin: "0 2% 0 5%" }}
          size={{ width: "55%", height: "28%" }}
          setSelectedNode={() => {
            setShowComponents(false);
          }}
        >
          <div style={{ margin: "2% 5% 0 2%" }}>
            <table style={{ border: "1px solid #999999", width: "103%" }}>
              <thead style={{ border: "1px solid #999999", height: "30px" }}>
                <tr>
                  <th style={styleTitulos}>Function</th>
                  <th style={styleTitulos}>Name</th>
                  <th style={styleTitulos}>Type</th>
                </tr>
              </thead>
              <tbody>
                {infoNode.selectedNode.components.map((component) => {
                  return (
                    <tr>
                      <td style={styleColumnas}>{component.function}</td>
                      <td style={styleColumnas}>{component.name}</td>
                      <td style={styleColumnas}>{component.type}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </FloatingWindow>
      )}

      <FloatingWindow
        positions={{ x: positions.x, y: positions.y - 200 }}
        header={{
          title: "Reaction R" + infoNode.selectedNode.number,
          color: "#D5E2EA",
          border: "1px solid darkgray",
        }}
        size={{ width: "400px", height: "200px" }}
        setSelectedNode={setSelectedNode}
      >
        <div style={{ margin: "5% 5% 5% 5% " }}>
          {infoNode.selectedNode.name && (
            <p style={{ fontSize: "17px", marginBottom: "8px" }}>
              <strong>Name:</strong> {infoNode.selectedNode.name}
            </p>
          )}
          {infoNode.selectedNode.description && (
            <p style={{ fontSize: "17px", marginBottom: "8px" }}>
              <strong>Description:</strong> {infoNode.selectedNode.description}
            </p>
          )}
          {infoNode.selectedNode.type && (
            <p style={{ fontSize: "17px", marginBottom: "8px" }}>
              <strong>Type:</strong> {infoNode.selectedNode.type}
            </p>
          )}
          <p
            style={{
              textDecoration: "underline",
              color: "#72A7C7",
              cursor: "pointer",
            }}
            onClick={(e) => {
              setShowComponents(true);
            }}
          >
            Components
          </p>
        </div>
      </FloatingWindow>
    </>
  );
}
