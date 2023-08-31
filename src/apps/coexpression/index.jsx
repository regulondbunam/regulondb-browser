import { useParams } from "react-router-dom";
import { useReducer } from "react";
import { NavigationTabs } from "../../components/ui-components";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetAllGenes } from "../../components/webservices";
import Cover from "./Cover";
import GeneQuery from "./geneQuery";
//import GeneCoexpression from "./geneCoexpression";
import GeneCoexpression from "./tabs/geneCoexpression";
import Matrix from "./matrix";

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
        genesInformation: [],
      };
    case "randomGene":
      return {
        ...state,
        selectedGenes: action.value,
      };
    case "addGeneInfo":
      return {
        ...state,
        genesInformation: [...state.genesInformation, ...action.value],
      };
    case "updateGeneInfo":
      return {
        ...state,
        genesInformation: action.value,
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
    coexpressionData: [],
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
      component: (
        <GeneCoexpression
          geneResults={appState.genesInformation}
          genesInformation={appState.genesInformation}
          coexpressionData={appState.coexpressionData}
          dispatch={dispatch}
        />
      ),
    },
    {
      id: "tab_03_Matrix",
      name: "Matrix",
      component: <Matrix genesInformation={appState.genesInformation} selectedGenes={selectedGenes}  />
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
