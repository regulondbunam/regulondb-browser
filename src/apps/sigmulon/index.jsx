/**
# Component (user guide)

# Sigmulon
	
## Description  
	
It is used to display information about a sigmulon based on its ID provided in the URL.

## Category   
Visual

## Live demo 
--

## Installation or Implementation
--

## Usage 
example: <Sigmulon/> 

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
useParams: This is a hook provided by the React Router library (from "react-router-dom"). It is used to access URL parameters in a React Router application, allowing the component to get information from the current URL.
React: The React import is the core React library used to create components and manage the user interface.
Title: It is used to represent titles or headings in the UI.

Home: it is related to the representation of the application's home page.
useGetSigmulonById: This hook is designed to fetch sigmulon data based on a specific sigmulon ID. It takes one argument, sigmulonId, which represents the ID of the sigmulon to retrieve.
Document: It displays documents or detailed information about regulons in the application user interface.


## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name  | Description |  Syntax  | Additional Notes or References | 
| ------ | ----------- | -------- | ------------------------------ |
|        |             |          |                                |

 
**/
import React from "react";
import { useParams } from "react-router-dom";
import { useGetSigmulonById } from "../../components/webservices";
import Title from "./Title";
import Home from "./home";
import Document from "./document";

function Sigmulon() {
  let { sigmulonId, promoterId } = useParams();

  if (sigmulonId) {
    return InformationBySigmulonID(sigmulonId)
  }
  return <Home/>;
}

export default Sigmulon;


/**
 * Retrieves and displays information about a sigmulon based on its ID.
 *
 * @param {string} sigmulonId - The ID of the sigmulon to fetch information for.
 * @returns {React.JSX} - A React JSX element representing the sigmulon information.
 */
function InformationBySigmulonID(sigmulonId) {
  const { loading, error, sigmulonData } = useGetSigmulonById(sigmulonId);
  
  /**
   * Description placeholder
   *
   * @type {string}
   */
  let state = "",
    title = "";
  if (loading) {
    state = "loading";
    title = "loading... Sigmulon document with id " + sigmulonId;
  }
  if (error) {
    state = "error";
    title = "... Sorry, we have an error, try again later 🥲";
  }
  if (sigmulonData) {
    if (sigmulonData === null) {
      state = "error";
      title =
        "Error, regulon document with id " + sigmulonId + " was not found. 😞";
    } else {
      state = "done";
      title = undefined
    }
  }
  return(
    <div>
      <Title title={title} state={state} {...sigmulonData} />
      {!title && (
        <Document sigmulonData={sigmulonData} />
      )}
    </div>
  )
}
