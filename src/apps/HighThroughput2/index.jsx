import React from "react";
import { useParams } from "react-router-dom";
import Home from "./Home";
//import Dataset from "./Dataset";

export const PATH_HT = {
  path: "ht",
  element: <HT />,
  children: [
    {
      path: ":site", //dataset, table, builder, browser
      children: [
        {
          path: ":datasetType",
          children: [
            {
              path: ":info",
            },
          ],
        },
      ],
    },
  ],
};

function HT() {
  const { site, datasetType, info } = useParams();
  if (datasetType) {
    switch (site) {
      case "dataset":
        return <>dataset</>;
      case "builder":
        return <>builder</>;
      case "browser":
        return <>browser</>;
      case "table":
        return <>table</>;
      default:
        return <Home />;
    }
  }
  return <Home />;
}
