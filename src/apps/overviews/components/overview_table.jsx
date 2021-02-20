import React from "react";
import { Modal, IntelligentTable } from "../../../components/ui-components/ui_components";
import ModalTable from "./overview_modal_table";

const Datatable = ({ data }) => {
  if (data) {
    const { getOverview } = data;
    const { graph } = getOverview;
    const { labelY, labelX } = graph;

    const datos = getOverview.data;
    const jsonData = [];

    for (let i = 0; i < datos.length; i++) {
      if (datos[i].xAxis === null) {
        jsonData.push({
          labelX: "Without Info",
          labelY: datos[i]?.yAxis,
          download: (
            <Modal title="See Data">
              <ModalTable datos={datos[i]} />
            </Modal>
          )
        });
      } else {
        jsonData.push({
          labelX: datos[i]?.xAxis,
          labelY: datos[i]?.yAxis,
          download: (
            <Modal title="See Data">
              <ModalTable datos={datos[i]} />
            </Modal>
          )
        });
      }
    }

    const dataTable = {
      columns: [
        {
          label: labelX,
          field: "labelX"
        },
        {
          label: labelY,
          field: "labelY"
        },
        {
          label: "data",
          field: "download"
        }
      ],
      rows: jsonData
    };

    return (
      <>
        <h2>Tabla de datos</h2>
        <IntelligentTable data={dataTable} />
      </>
    );
  }
  return <>Data Error</>;
};

export default Datatable;
