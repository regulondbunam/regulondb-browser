/**
# Component (user guide)

# DrawingTracesInterface
	
## Description  
	
It is responsible for rendering an interface that allows users to interact with data related to tracking and drawing genetic elements.

## Category   

Visual 

## Live demo 
	
--

## Installation or Implementation
--

## Usage 
	
--

## Props 

| Attribute | Type  | Default | Description                                                                                            |
| --------- | ----  | ------- | ------------------------------------------------------------------------------------------------------ |
|params     |object |         |An object that is passed as a property to the DDTE component if it is being embedded in another context.|
|embed      |boolean|false    |A boolean indicating whether the component is being embedded in another context or not. By default, it is false|


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
Tabs: this component is related to tabbed navigation in the user interface.
useParams: it is a hook provided by the "react-router-dom" library that is used to access the URL parameters.
UserData: React component used to display user data in the application interface.
RDBdata: React component related to retrieving and displaying drawing data from "RegulonDB".
DDTE: Component used to display or embed trace or genetic related data in a part of the application.
Title: React component used to display titles in different parts of the application UI, with the ability to dynamically update the title and display status related messages.

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name   | Description                                                                                                         |  Syntax    | Additional Notes or References | 
| ------  | ------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------ |
|useParams|returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>|useParams();|                                |


 
**/
import { Tabs } from "./tabs/tabs";
import { useParams } from "react-router-dom";
import UserData from "./user_data";
import RDBdata from "./rdb_data";
import DDTE from "./embed";
import Title from "./title";


/**
 * Description placeholder
 *
 * @type {array}
 */
const tabsInfo = [
  { id: "1", name: "RegulonDB-Data", disabled: false },
  { id: "2", name: "User Data", disabled: false },
];


/**
 * Description placeholder
 *
 * @type {array}
 */
const geneticElements = [
  "gene",
  "promoter",
  "operon",
  "tf binding site",
  "rna",
  "riboswitch",
  "transnational_attenuator",
  "transcriptional_attenuator",
  "ppGpp",
];


/**
 * Description placeholder
 *
 * @param {{ params: any; embed?: boolean; }} { params, embed = false }
 * @returns {React.JSX}
 */
function DrawingTracesInterface({ params, embed = false }) {

  
  /**
   * Description placeholder
   *
   * @type {URLSearchParams}
   */
  let parameters = new URLSearchParams(useParams().parameters);

  if (embed === true) {
    return <DDTE params={params} />;
  }
  
  /**
   * Description placeholder
   *
   * @type {undefined}
   */
  let dataForm = undefined;
  if (parameters.get("leftEndPosition") && parameters.get("leftEndPosition")) {
    try{
      dataForm = {
        covered: false,
        leftEndPosition: parseInt(parameters.get("leftEndPosition")),
        objectType: geneticElements,
        rightEndPosition: parseInt(parameters.get("rightEndPosition")),
        strand: "both",
      };
    }catch{
      console.error("left or right position invalid");
    }
    
  }

  
  /**
   * Description placeholder
   *
   * @type {array}
   */
  const tabs = [
    <div id="1">
      <RDBdata dataForm={dataForm} />
    </div>,
    <div id="2">
      <UserData></UserData>
    </div>,
  ];

  return (
    <div>
      <Title title={"Drawing Traces Tool"} />
      <Tabs tabSelect={"1"} tabsInfo={tabsInfo} tabs={tabs} />
    </div>
  );
}

export default DrawingTracesInterface;
