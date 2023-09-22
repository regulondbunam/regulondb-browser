/**
# Component (user guide)

# [Component name]
	
## Description  
	
[Description Details]

## Category   
	
[Visual, Structural, Functional]  

## Live demo 
	
[code to iframe CodeSandbox]

## Installation or Implementation

[example: npm install --save react-awesome-button]

## Usage 
	
[example: <protvista-tooltip>  </protvista-tooltip> ]

## Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|           |      |         |             |


## Exception

__Category: [Error, Warning or Message]__
[Description of the exception (if necessary)]

## License

MIT License

## Author 
	
RegulonDB Team: 
[full developer name]


# Component (technical guide)

## Component Type 

[ Driver, Visual, Application, Custom Hook, ClassComponent ]
// Driver: It is a Component that controls interactions with users, browser, API requests, manage status or processes as well as logic related to data.
// Visual: This component will take care of the structure and styles of our application.
// Application: Application: is the main component of a web application or library.
// Custom Hook: is a custom React function, which unlike the other components can return variables.
// ClassComponent: is a tradicional React component class

## Dependencies
[Dependency name][ Dependency details ]

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

function InformationBySigmulonID(sigmulonId) {
  const { loading, error, sigmulonData } = useGetSigmulonById(sigmulonId);
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
