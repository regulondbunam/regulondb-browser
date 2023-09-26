/**
# Component (user guide)

# Regulon
	
## Description  	
it is responsible for displaying the details of a regulon based on an ID provided in the URL.

## Category   
Functional

## Live demo 
--

## Installation or Implementation
--

## Usage 
	
[example: <Regulon/> ]

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

Title: It is used to represent titles or headings in the UI.

useGetRegulonData: . Its exact functionality depends on how it is implemented in that file, but its name suggests that it is used to get data related to regulons, possibly from web services.

Home: it is related to the representation of the application's home page.

Document: It displays documents or detailed information about regulons in the application user interface.


## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name   | Description                                                                                                                       |  Syntax  | Additional Notes or References | 
| ------- | --------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------ |
|useParams| hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path></Route>|useParams |                                |


 
**/
import { useParams } from "react-router-dom";
import Title from "./Title";
import { useGetRegulonData } from "../../components/webservices";
import Home from "./home";
import Document from "./document";


/**
 * Description placeholder
 *
 * @returns {HTMLElement|React.JSX}
 */
function Regulon() {
    let { regulonId } = useParams();
    const { regulonData: regulons, loading, error } = useGetRegulonData(regulonId)
    if (regulonId) {
        
        /**
         * Description placeholder
         *
         * @type {*}
         */
        const regulonData = regulons

        
        /**
         * Description placeholder
         *
         * @type {string}
         */
        let state = "", title = ""
        if (loading) {
            state = "loading"
            title = "loading... Regulon document with id " + regulonId
        }
        if (error) {
            state = "error"
            title = "... Sorry, we have an error, try again later 🥲"
        }
        if (regulonData) {
            if (regulonData === null) {
                state = "error"
                title = "Error, regulon document with id " + regulonId + " was not found. 😞"
            } else {
                state = "done"
                title = regulonData.regulator.name
            }
        }
        //console.log(regulonData);
        return (
            <div>
                <Title title={title} state={state} regulator={regulonData && regulonData.regulator} />
                {regulonData && (
                    <Document regulonData={regulonData} />
                )}
            </div>
        )
    } else {
        return <Home />
    }
}

export default Regulon;