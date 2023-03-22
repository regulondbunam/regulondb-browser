import React from "react";
import { useQuery } from "@apollo/client";
//Components
import { GetData } from "../../../webServices/docs_queries";
import { FormatDataDesc } from "../../../webServices/structuringData";
import TableServ from "../components/TableServ";
//Assets
import ServDescCSS from "./css/ServDesc.module.css";

const ServDescs = ({ id, name, title, disabled }) => {
  const { loading, error, data } = useQuery(GetData());
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error...</p>;

  const DescServices = FormatDataDesc(data);

  return (
    <>
      <h2 className={ServDescCSS.title}>{title}</h2>

      {Object.keys(DescServices).map((category, i) => (
        <div key={i} id={category}>
          <h3 className={ServDescCSS.categorys}>{category}</h3>
          {Object.keys(DescServices[category]).map((service, j) => (
            <div
              key={j}
              className={ServDescCSS.containerServiceCategory}
              id={service}
            >
              <h4 className={ServDescCSS.serviceCategory}>{service}</h4>
              <TableServ service={DescServices[category][service]} />
            </div>
          ))}
          <br />
        </div>
      ))}
    </>
  );
};

export default ServDescs;
