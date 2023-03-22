import React from "react";
import { Link } from "react-router-dom";
//Assets
import TableCSS from "./css/TableServ.module.css";
import conf from "./../conf/view_main.conf.json";

const TableServ = (props) => {
  return (
    <div className={TableCSS.container}>
      <table className={TableCSS.table}>
        <thead>
          <tr className={TableCSS.containerText}>
            <th className={TableCSS.query}>
              {conf.table_serv.table_head.head_1.title}
            </th>
            <th className={TableCSS.description}>
              {conf.table_serv.table_head.head_2.title}
            </th>
          </tr>
        </thead>
        <tbody>
          {props.service.map((ObjectService, k) => (
            <tr key={k} className={TableCSS.containerText}>
              <td className={TableCSS.query}>
                <Link to={"/doc_datamarts/"+ObjectService.Nombre} >
                 {ObjectService.Nombre}
                </Link>
              </td>
              <td className={TableCSS.description}>
                <p className={TableCSS.DescriptionService}>
                  {ObjectService.Descripcion}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableServ;
