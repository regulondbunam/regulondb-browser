import { useParams } from "react-router-dom";
import { useReducer, useState } from "react";
import { DataVerifier, NavigationTabs } from "../../components/ui-components";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetAllGenes, useLazyLoadGenesBySearch } from "../../components/webservices";
import Cover from "./Cover";
import GeneQuery from "./geneQuery";


function Coexpression() {
  const { geneList, loading /*error*/ } = useGetAllGenes();
  let { genesId } = useParams();

  let selectedGenes = [];

  if (genesId) {
    const searchParams = new URLSearchParams(genesId);
    selectedGenes = searchParams.getAll("geneId");
  }

  return (
    <div>
      <Cover />
      {loading && (
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <CircularProgress />
        </div>
      )}
      {DataVerifier.isValidArray(geneList) && (
        <IntCoexpression selectedGenes={selectedGenes} geneList={geneList} />
      )}
    </div>
  );
}

const reducer = (state, action) => {
  switch (action.type) {
    case "addGene":
      return {
        ...state,
        genesId: [...state.genesId, action.value],
      };
    case "deleteGene":
      const index = state.genesId.findIndex((id) => id === action.value);
      let genesId = [...state.genesId];
      genesId.splice(index, 1);
      return {
        ...state,
        genesId: genesId,
      };
    case "cleanGene":
      return {
        ...state,
        genesId: [],
        genesInformation: [],
      };
    case "randomGene":
      return {
        ...state,
        genesId: action.value,
      };
    case "addGeneInfo":
      return {
        ...state,
        genesInformation: [...state.genesInformation, action.value],
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

function IntCoexpression({ selectedGenes = [], geneList }) {
  const [genesId,setGenesId] = useState([...selectedGenes])
  const [unload, setUnload] = useState([...selectedGenes])
  const [genes,setGenes] = useState([])
  const {loading, error, loadState} = useLazyLoadGenesBySearch(unload,genes,setGenes,genesId.length)
  console.log(loadState);

  const selectGene = (geneId)=>{
    setGenesId([...genesId, geneId])
    setUnload([geneId])
    let href = window.location.href
    const regex = /n$/gm.test(href)
    if(regex){
      href = href+"/geneId="+geneId
    }else{
      href = href+"&geneId="+geneId
    }
    window.history.replaceState(null, "", href)
  }

  const tabs = [
    {
      id: "tab_01_geneQuery",
      name: "Query",
      component: (
        <GeneQuery genesId={genesId} genes={genes} genesList={geneList} selectGene={selectGene} />
      ),
    },
    /*
    {
      id: "tab_02_geneCoexpression",
      name: "Coexpression",
      component: (
        <GeneCoexpression
          geneResults={genes}
          genesInformation={genes}
          coexpressionData={appState.coexpressionData}
          dispatch={dispatch}
        />
      ),
    },
    {
      id: "tab_03_Matrix",
      name: "Matrix",
      component: (
        <Matrix
          genesInformation={genes}
          selectedGenes={selectedGenes}
        />
      ),
    },*/
  ];

  if (geneList) {
    return (
      <div>
        {loading && "Loading gene information"}
        <NavigationTabs tabs={tabs} tabSelect="tab_01_geneQuery" />
      </div>
    );
  }
  return <></>;
}

export default Coexpression;