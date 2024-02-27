import React, { useEffect, useRef, useState } from "react";
import { flexRender } from "@tanstack/react-table";

export default function Row({ row, rowHeight: _rowHeight = 30 }) {
  const [rowHeight, setRowHeight] = useState(_rowHeight);

  return (
    <tr key={row.id}>
      {row.getVisibleCells().map((cell) => Cell(cell,_rowHeight, rowHeight, setRowHeight))}
    </tr>
  );
}

function Cell(cell,defaultRowHeight, rowHeight, setRowHeight) {
  const [resize, setResize] = useState(false);
  const height = useRef(null)
  useEffect(() => {
    const cellCont = document.getElementById("cell_" + cell.id + "_item");
    if (cellCont && !resize) {
      if (cellCont.offsetHeight > rowHeight) {
        height.current = cellCont.offsetHeight
      }
      setResize(true);
    }
  }, [cell, rowHeight, resize]);
  let style = {};
  if (resize) {
    style = { height: rowHeight + "px", overflow: "auto" };
  }
  return (
    <td
      {...{
        key: "cell_" + cell.id,
        style: {
          width: cell.column.getSize(),
          height: rowHeight + "px",
        },
      }}
    >
      <div
        onMouseEnter={() => {
          if (height.current > rowHeight) {
            setRowHeight(height.current)
          }
        }}
        onMouseLeave={()=>{
          if (height.current > defaultRowHeight) {
            setRowHeight(defaultRowHeight)
          }
        }}
      >
        <div id={"cell_" + cell.id + "_item"}>
          {typeof cell.getValue() === "object" ? (
            <div style={style}>{cell.getValue()}</div>
          ) : (
            <div style={style}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          )}
        </div>
      </div>
    </td>
  );
}
