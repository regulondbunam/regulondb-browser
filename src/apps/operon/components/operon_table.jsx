import React from "react";
import Style from "./table.module.css";

const Table = ({
  id = "idtable",
  keyword = "",
  fieldOrder = "",
  data,
  title = null,
  href_base = "/"
}) => {
  const columns = data.columns;
  const rows = data.rows;

  return (
    <table id={id} style={{ width: "100%" }}>
      <thead className={Style.resultTable_thead}>
        {title != null ? (
          <tr>
            <th className={Style.resultTable_th_title} colSpan={columns.length}>
              {title}
            </th>
          </tr>
        ) : null}
      </thead>
      <tbody>
        {rows.map((row, index) => {
          const str = columns
            .map((item) => {
              return item.field !== "id" ? row[item.field] : null;
            })
            .join(",");
          return (
            <tr key={`tr-key-table-${index}-${id}`}>
              <td>
                <a
                  assistentvalue={`elemento encontrado ${str}`}
                  style={{ color: "#666666" }}
                  href={`${href_base}${row["id"]}`}
                  dangerouslySetInnerHTML={{ __html: str }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
