/**
# Component (user guide)

# Embed
	
## Description  
	
It is a controller that decides which application to embed based on the URL parameters and displays them within the user interface.

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
	
RegulonDB Team


# Component (technical guide)

## Component Type 

Visual

## Dependencies
useParams: The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>.
DrawingTracesInterface: This component is related to the user interface for drawing traces or genetic elements.
HtParameters: This component is used to route and render different pages and content related to a high performance data set in a web application.

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name   | Description                                                                                                                      |  Syntax    | Additional Notes or References | 
| ------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------ |
|useParams|A hook provided by React Router to access the current URL parameters and extract values from the URL for use in application logic.|useParams();|                                |

**/
import { useParams } from "react-router-dom";
import DrawingTracesInterface from "../dtt";


/**
 * Description placeholder
 *
 * @returns {HTMLElement|React.JSX}
 */
function Embed () {

    // eslint-disable-next-line no-unused-vars
    const { application, parameters, parameterA, parameterB, parameterC} = useParams()
    
    /**
     * Description placeholder
     *
     * @type {*}
     */
    let params
    switch (application) {
        case "dtt":
            params = new URLSearchParams(parameters);
            return (
                <DrawingTracesInterface params={params} embed={true} />
            );
        default:
            return (
                <div>application no embed permission</div>
            );
    }
    
}
 
export default Embed;