/**
# Component (user guide)

# SRNA
	
## Description  
	
It is a functional React component that uses the React router (react-router-dom) to get the URL parameters and decide which component to display based on the value of srnaId in the URL.

## Category   
	
Visual 

## Live demo 
--

## Installation or Implementation
--

## Usage 
	
example: <SRNA/> 

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
Home: it is related to the representation of the application's home page.
Details: represents a React component that is used to display details of an SRNA object.


## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name    | Description                                                                                                                                                                                                     |  Syntax    | Additional Notes or References | 
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------ |
| useParams|This is a hook provided by the React Router library (from "react-router-dom"). It is used to access URL parameters in a React Router application, allowing the component to get information from the current URL.|useParams();|                                |



 
**/
import { useParams } from "react-router-dom";
import Home from "./home";
import Details from "./details";


/**
 * Description placeholder
 *
 * @returns {HTMLElement|React.JSX}
 */
function SRNA() {
  let { srnaId } = useParams();

  if (srnaId) {
    return(
      <Details srnaId={srnaId} />
    )
  }

  return (
    <div>
      <Home />
    </div>
  );
}

export default SRNA;    