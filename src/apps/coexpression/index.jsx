/**g
# Component (user guide)

# Coexpression
	
## Description  
	This component allows users to explore gene coexpression data using different tabs to query, view coexpression information and display a matrix. 


## Category   
	
Visual 

## Live demo 
	--

## Installation or Implementation
--

## Usage 
--

## Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|           |      |         |             |


## Exception
--

## License

MIT License

## Author 
	
RegulonDB Team:


# Component (technical guide)

## Component Type 
Visual


## Dependencies
useParams: it is a hook provided by React Router. It is used to get the URL parameters in a React component.
useReducer: it is a React hook used to manage complex state in the application. It allows to manage state through actions and a reducer similar to Redux.
NavigationTabs: It is a custom component that is a navigation tab to switch between different views or sections within the application.
CircularProgress: it  is a Material-UI component that represents a circular progress bar, typically used to indicate loading or processing in progress in the user interface.
useGetAllGenes: it is a custom hook that is used to obtain data related to genes.
Cover: it is a component that displays some form of cover page or header in the user interface.
GeneQuery: it is a component that is related to gene query and selection.
GeneCoexpression: it is a component that displays information related to gene co-expression. It allows users to see details about how genes are expressed together.
Matrix: it is a component that displays information related to gene co-expression. It allows users to see details about how genes are expressed together.


## States
	
| Property       | Value| Description                  |
| -------------- | ----| --------------------------------------------- |
|selectedGenes   |array|Represents an array of selected genes.         |
|genesInformation|array|Represents information about genes.            |
|coexpressionData|array|	Represents data related to gene coexpression.|


## Hooks
|  Name        | Description                                                      |  Syntax                                                       | Additional Notes or References               | 
| -------------| -----------------------------------------------------------------| ------------------------------------------------------------- | ------------------------------               |
|useParams	   |A hook from react-router-dom for accessing route parameters.	    |const { paramName } = useParams();	                            |React Router useParams Documentation          |
|useReducer    |A hook for managing complex state logic using a reducer function. |	const [state, dispatch] = useReducer(reducer, initialState);	|React useReducer Documentation                |
|useGetAllGenes|	Custom hook for fetching a list of genes.                       |	const { geneList, loading, error } = useGetAllGenes();	      |Custom hook implementation for fetching genes.|

# Functions description

## Reducer

__Description:__  

The reducer function is used for managing state transitions in the React component. It takes the current state and an action as input and returns a new state based on the action type.


__Usage:__

```javascript
&reducer(state, action);
```

__Scope: __

This function is used within the IntCoexpression component to manage the state related to selected genes and gene information.

__Input Parameter:__  
state: Represents the current state of the component, including properties like selectedGenes and genesInformation.
action: An object containing information about the action to be performed. 

__Return:__  
​__[Type]:__ [Name]
The function returns a new state object based on the action type. The structure of the returned state object depends on the action type.

 
**/
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
import Matrix from "./matrix";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


/**
 * Description placeholder
 *
 * @returns {React.JSX}
 */
function Coexpression() {
  const { geneList, loading /*error*/ } = useGetAllGenes();
  let { genesId } = useParams();

  
  /**
   * Description placeholder
   *
   * @type {array}
   */
  let selectedGenes = [];

  if (genesId) {
    
    /**
     * Description placeholder
     *
     * @type {URLSearchParams}
     */
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
  const [matrices, setMatrices] = useState({});
  const loadGeneState = useLazyLoadGenesBySearch(
    unload,
    setUnload,
    genes,
    setGenes,
    genesId
  );
  //let loading
  //console.log("genes",genes.map(gene=>gene.gene.name).join(" "));
  //console.log(loadGeneState.loading);
  //console.log(loadGeneState.loadState);

  const addMatrix = (gene, data) => {
    let newMatrix = {};
    newMatrix[gene] = data;
    setMatrices({ ...matrices, ...newMatrix });
  };
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
    {
      id: "tab_03_Matrix",
      name: "Matrix",
      disabled: loadGeneState.loading,
      component: (
        <Matrix genesInformation={genes} selectedGenes={selectedGenes} matrices={matrices} addMatrix={addMatrix} />
      ),
    },
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
