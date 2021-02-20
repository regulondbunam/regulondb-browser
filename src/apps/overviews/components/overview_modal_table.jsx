import React from "react";
import { IntelligentTable } from "../../../components/ui-components/ui_components";

const ModalTable = ({ datos }) => {
  const { objectsRelated } = datos;

  let row = [];

  objectsRelated.map((obj) => {
    console.log(obj)
    row.push({
      data: obj?.name,
      more: <a href={`/gene/${obj?._id}`}>more info ...</a>
    });
    return null;
  });

  const dataTable = {
    columns: [
      {
        label: "data",
        field: "data"
      },
      {
        label: "more info",
        field: "more"
      }
    ],
    rows: row
  };

  return (
    <IntelligentTable
      scrollY
      striped
      sortable
      small
      sorting={true}
      data={dataTable}
    />
  );
};

export default ModalTable;
