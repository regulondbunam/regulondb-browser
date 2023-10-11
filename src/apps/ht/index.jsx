import React from "react";
import { useParams } from "react-router-dom";
import Home from "./home";
import Finder from './finderPage/Finder'
import Dataset from './datasetPage/Dataset';

window.IN_URL = {
  main: "/ht",
  finder: "/ht/finder/",
  dataset: "/ht/dataset/",
};

export default function HT() {
  const { site, datasetType, info } = useParams();
  if (datasetType) {
    switch (site) {
      case "finder":
        return <Finder datasetType={datasetType} />;
      case "dataset":
            const query = new URLSearchParams(info);
            return <Dataset datasetId={query.get('datasetId')} tfName={query.get('tf')} datasetType={datasetType} experimentType={query.get('experimentType')} />
      default:
        return <Home />;
    }
  }
  return <Home />;
}
