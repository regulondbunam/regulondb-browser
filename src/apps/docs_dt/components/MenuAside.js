import React from "react";
import { useQuery } from "@apollo/client";

import { GetData } from "../../../webServices/docs_queries";
import { FormatData } from "../../../webServices/structuringData";
import Menu from "./Menu";
import MenuAside from "./css/MenuAside.module.css";

export default function App() {
  const { loading, error, data } = useQuery(GetData());
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error...</p>;

  const dataMenu = FormatData(data);

  return (
    <div className={MenuAside.sideMenu}>
      <Menu {...dataMenu} />
    </div>
  );
}
