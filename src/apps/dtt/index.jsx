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
RDBdata:
DDTE:
Title:

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name  | Description |  Syntax  | Additional Notes or References | 
| ------ | ----------- | -------- | ------------------------------ |
|        |             |          |                                |

# Functions description

## [function name]

__Description:__  

[Description of the function]


__Usage:__

```javascript
&function(Parameters, if any);
```

__Scope: __

[Scope details]

__Input Parameter:__  
​__[Name]:__ [Description]
__[Name]:__ [Description]


__Return:__  
​__[Type]:__ [Name]
​[Description (if necessary)]

 
**/
import { Tabs } from "./tabs/tabs";
import { useParams } from "react-router-dom";
import UserData from "./user_data";
import RDBdata from "./rdb_data";
import DDTE from "./embed";
import Title from "./title";

const tabsInfo = [
  { id: "1", name: "RegulonDB-Data", disabled: false },
  { id: "2", name: "User Data", disabled: false },
];

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

function DrawingTracesInterface({ params, embed = false }) {
  let parameters = new URLSearchParams(useParams().parameters);

  if (embed === true) {
    return <DDTE params={params} />;
  }
  
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
