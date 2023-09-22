/**
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
import { useReducer } from "react";
import { NavigationTabs } from "../../components/ui-components";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetAllGenes } from "../../components/webservices";
import Cover from "./Cover";
import GeneQuery from "./geneQuery";
//import GeneCoexpression from "./geneCoexpression";
import GeneCoexpression from "./tabs/geneCoexpression";
import Matrix from "./tabs/matrix";


/**
 * Description placeholder
 *
 * @returns {React.JSX}
 */
function Coexpression() {
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
      <IntCoexpression selectedGenes={selectedGenes} />
    </div>
  );
}


/**
 * Description placeholder
 *
 * @param {object} state - Represents the current state of the component, including properties like selectedGenes and genesInformation.
 * @param {object} action -  An object containing information about the action to be performed. 
 * @returns {*}
 */
const reducer = (state, action) => {
  switch (action.type) {
    case "addGene":
      return {
        ...state,
        selectedGenes: [...state.selectedGenes, action.value],
      };
    case "deleteGene":
      
      /**
       * Description placeholder
       *
       * @type {*}
       */
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


/**
 * Description placeholder
 *
 * @param {{ selectedGenes: any; }} { selectedGenes }
 * @returns {React.JSX}
 */
function IntCoexpression({ selectedGenes }) {
  const { geneList, loading, error } = useGetAllGenes();
  const [appState, dispatch] = useReducer(reducer, {
    selectedGenes: selectedGenes,
    genesInformation: [],
    coexpressionData: [],
  });

  
  /**
   * Description placeholder
   *
   * @type {array}
   */
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
