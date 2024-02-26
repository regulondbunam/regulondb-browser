import React, { useState } from "react";
import { flexRender } from "@tanstack/react-table";

export default function Row({ row, rowHeight = 30 }) {
  //const [first, setfirst] = useState(second)
  const styleCell = { height: rowHeight + "px", overflow: "auto" };
  return (
    <tr key={row.id}>
      {row.getVisibleCells().map((cell) => {
        if (typeof cell.getValue() === "object") {
          return (
            <td
              {...{
                key: cell.id,
                style: {
                  width: cell.column.getSize(),
                },
              }}
            >
              <div style={styleCell}>{cell.getValue()}</div>
            </td>
          );
        } else {
          return (
            <td
              {...{
                key: cell.id,
                style: {
                  width: cell.column.getSize(),
                },
              }}
            >
              <div style={styleCell}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            </td>
          );
        }
      })}
    </tr>
  );
}
