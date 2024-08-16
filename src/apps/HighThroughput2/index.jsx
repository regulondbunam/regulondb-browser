import React from "react";
import { useParams } from "react-router-dom";
import Home from "./Home";
import Browser from "./Browser";
//import Dataset from "./Dataset";

export const PATH_HT = {
  path: "ht",
  element: <HT />,
  children: [
    {
      path: ":site", //dataset, finder
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
        return <Browser datasetType={datasetType}/>;
      case "finder":
        return <>finder</>;
      default:
        return <Home />;
    }
  }
  return <Home />;
}
