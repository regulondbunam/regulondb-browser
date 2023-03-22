import React from "react";
import { useQuery } from "@apollo/client";
//Components
import { GetArguments } from "../../../webServices/docs_queries";
import { FormatDataTable } from "../../../webServices/structuringData";
//Assets
import TableCSS from "./css/Table.module.css";
import conf from "../conf/view_main.conf.json";

const Table = (props) => {
  const { loading, error, data } = useQuery(GetArguments());
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error...</p>;
  
  const Args = FormatDataTable(data);
  //console.log("table",Args);
  return (
    <div className={TableCSS.table}>
      {Object.keys(Args[props.service]).length !== 0 ? (
        <table>
          <thead>
            <tr>
              <th>{conf.table.table_head.head_1.title}</th>
              <th>{conf.table.table_head.head_2.title}</th>
              <th>{conf.table.table_head.head_3.title}</th>
              <th>{conf.table.table_head.head_4.title}</th>
              <th>{conf.table.table_head.head_5.title}</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(Args[props.service]).map((args) =>
              Args[props.service][args].map((service, index) => (
                <tr key={index}>
                  <td>{args}</td>
                  <td>{service.Descripcion}</td>
                  <td>{service.Tipo}</td>
                  <td>{service.Necesario}</td>
                  <td>
                    {service.ValorPorDefault == null
                      ? "Not defined"
                      : service.ValorPorDefault}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      ) : (
        <h4 className={TableCSS.text}>
          {conf.table.table_empty.message.title}
        </h4>
      )}
    </div>
  );
};

export default Table;
