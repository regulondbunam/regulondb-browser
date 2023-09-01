import { useParams } from "react-router-dom";
import { useState } from "react";
import { DataVerifier, NavigationTabs } from "../../components/ui-components";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useGetAllGenes,
  useLazyLoadGenesBySearch,
} from "../../components/webservices";
import Cover from "./Cover";
import GeneQuery from "./geneQuery";
import GeneCoexpression from "./geneCoexpression";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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

function IntCoexpression({ selectedGenes = [], geneList }) {
  const [genesId, setGenesId] = useState([...selectedGenes]);
  const [unload, setUnload] = useState([...selectedGenes]);
  const [genes, setGenes] = useState([]);
  const loadGeneState = useLazyLoadGenesBySearch(
    unload,
    setUnload,
    genes,
    setGenes,
    genesId
  );
  //let loading
  //console.log("genes",genes);
  //console.log(loadGeneState.loading);
  //console.log(loadGeneState.loadState);

  const reset = () => {
    setGenesId([]);
    setGenes([]);
  };

  const setDemo = (ids) => {
    setGenesId([...ids]);
    setUnload([...ids]);
    let href = window.location.href;
    const regex = /n$/gm.test(href);
    if (regex) {
      href = href + "/geneId=" + ids.join("&geneId=");
    } else {
      href = href + "&geneId=" + ids.join("&geneId=");
    }
    window.history.replaceState(null, "", href);
  };

  const selectGene = (geneId) => {
    setGenesId([...genesId, geneId]);
    setUnload([geneId]);
    let href = window.location.href;
    const regex = /n$/gm.test(href);
    if (regex) {
      href = href + "/geneId=" + geneId;
    } else {
      href = href + "&geneId=" + geneId;
    }
    window.history.replaceState(null, "", href);
  };

  const deleteGene = (geneId) => {
    const iId = genesId.findIndex((id) => id === geneId);
    let ids = [...genesId];
    ids.splice(iId, 1);
    setGenesId(ids);
  };

  const tabs = [
    {
      id: "tab_01_geneQuery",
      name: "Query",
      component: (
        <GeneQuery
          deleteGene={deleteGene}
          genesId={genesId}
          loadGeneState={loadGeneState}
          genes={genes}
          genesList={geneList}
          selectGene={selectGene}
          setDemo={setDemo}
          reset={reset}
        />
      ),
    },
    {
      id: "tab_02_geneCoexpression",
      name: "Coexpression",
      disabled: loadGeneState.loading,
      component: <GeneCoexpression genes={genes} />,
    },
    /*

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
        {genesId.length > 50 && loadGeneState.loading && (
          <ModalLoad loadState={loadGeneState.loadState} />
        )}
        <NavigationTabs tabs={tabs} tabSelect="tab_01_geneQuery" />
      </div>
    );
  }
  return <></>;
}

export default Coexpression;

function ModalLoad({ loadState = 0, abort }) {
  return (
    <Dialog open={true}>
      <DialogTitle id="alert-dialog-title">
        {"Loading gene information"}
      </DialogTitle>
      <DialogContent>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <CircularProgress variant="determinate" value={loadState} />
        </div>
        <DialogContentText id="alert-dialog-description">
          The query is too big, please wait a moment, while we load the
          information of the selected genes.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={abort}>CANCEL</Button>
      </DialogActions>
    </Dialog>
  );
}

/*
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
*/
