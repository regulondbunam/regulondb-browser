import React from "react";
import Style from "./table.module.css";
import Mark, {
  MarckScore
} from "../../../components/ui-components/web/components/utiles/MarkStr";

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
        {rows.map((row, index) => {
          const str = columns
            .map((item) => {
              return item.field !== "id" ? row[item.field] : null;
            })
            .join(",");
          const score = MarckScore(keyword, row[fieldOrder]);
          if (score >= 100) {
            return (
              <tr key={`tr-key-table-${index}-${id}`}>
                <th
                  colSpan={columns.length}
                  className={Style.resultTable_th_subtitle}
                >
                  <a
                    style={{ color: "#666666" }}
                    href={`${href_base}${row["id"]}`}
                    dangerouslySetInnerHTML={{ __html: Mark(keyword, str) }}
                  />
                </th>
              </tr>
            );
          }
          return null;
        })}
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
                  dangerouslySetInnerHTML={{ __html: Mark(keyword, str) }}
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
