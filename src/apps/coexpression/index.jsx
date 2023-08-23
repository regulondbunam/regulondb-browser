import { useParams } from "react-router-dom";
import { useReducer } from "react";
import { NavigationTabs } from "../../components/ui-components";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetAllGenes } from "../../components/webservices";
import Cover from "./Cover";

import GeneQuery from "./geneQuery";
import GeneCoexpression from "./geneCoexpression";

function Coexpression() {
  let { genesId } = useParams();

  let selectedGenes = [];

  if (genesId) {
    const searchParams = new URLSearchParams(genesId);
    selectedGenes = searchParams.getAll("geneId");
  }

  return (
    <div>
      <Cover />
      <IntCoexpression selectedGenes={selectedGenes} />
    </div>
  );
}

const reducer = (state, action) => {
  switch (action.type) {
    case "addGene":
      return {
        ...state,
        selectedGenes: [...state.selectedGenes, action.value],
      };
    case "deleteGene":
      const index = state.selectedGenes.findIndex((id) => id === action.value);
      let selectedGenes = [...state.selectedGenes];
      selectedGenes.splice(index, 1);
      return {
        ...state,
        selectedGenes: selectedGenes,
      };
    case "cleanGene":
      return {
        ...state,
        selectedGenes: [],
      };
    case "randomGene":
      return {
        ...state,
        selectedGenes: [...state.selectedGenes, ...action.value],
      };
    default:
      return state;
  }
};

function IntCoexpression({ selectedGenes }) {
  const { geneList, loading, error } = useGetAllGenes();
  const [appState, dispatch] = useReducer(reducer, {
    selectedGenes: selectedGenes,
    genesInformation: [],
  });

  const tabs = [
    {
      id: "tab_01_geneQuery",
      name: "Query",
      component: (
        <GeneQuery
          appState={appState}
          dispatch={dispatch}
          genesList={geneList}
        />
      ),
    },
    {
      id: "tab_02_geneCoexpression",
      name: "Coexpression",
      component: <GeneCoexpression />,
    },
    {
      id: "tab_03_Matrix",
      name: "Matrix",
    },
  ];

  if (error) {
    return <>Error</>;
  }

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <CircularProgress />
      </div>
    );
  }
  if (geneList) {
    return <NavigationTabs tabs={tabs} tabSelect="tab_01_geneQuery" />;
  }
  return <></>;
}

export default Coexpression;
