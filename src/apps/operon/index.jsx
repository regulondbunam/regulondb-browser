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
import "./operon.css";
import Home from "./home";
import { useGetOperonByID, useGetOperonByTuId } from "../../components/webservices";
import Title from "./Title";
import Document from "./document";


export default function Operon() {
  let { operonId, tuId, section } = useParams();
  if (!operonId && !tuId) {
    return <Home />
  }
  if (tuId) {
    return <RedirectToOperon tuId={tuId} />
  }
  if (operonId) {
    return <LoadOperon operonId={operonId} section={section} />
  }
  return null
}

function RedirectToOperon({ tuId }) {
  const { operonData, loading, error } = useGetOperonByTuId({ _tuId: tuId })

  let state = "done"
  let title = "Validating TU id " + tuId
  if (loading) {
    state = "loading"
    title = "loading... Validating TU id " + tuId
  }
  if (error) {
    state = "error"
    title = "... Sorry, we have an error, try again later 🥲"
  }
  if (operonData) {
    if (operonData === null) {
      state = "error"
      title = "Error, Operon document with TU id was not found. 😞"
    } else {
      state = "done"
      title = operonData.operon.name
      if (operonData?._id) {
        window.history.pushState({},'RegulonDB','/operon/'+operonData._id+"/tu_"+tuId);
      }
    }
  }

  return (
    <div>
      <Title state={state} title={title} operonData={operonData} />
      {operonData && (
        <Document operonData={operonData}/>
      )}
    </div>
  )
}

function LoadOperon({ operonId, section }) {
  const { operonData, loading, error } = useGetOperonByID({ _id: operonId })
  let state = "done"
  let title = "Operons"
  if (loading) {
    state = "loading"
    title = "loading... Operon document with id "+operonId
  }
  if (error) {
    state = "error"
    title = "... Sorry, we have an error, try again later 🥲"
  }
  if (operonData) {
    if (operonData === null) {
      state = "error"
      title = "Error, Operon document with id "+operonId+" was not found. 😞"
    } else {
      state = "done"
      title = operonData.operon.name
    }
  }
  return (
    <div>
      <Title state={state} title={title} operonData={operonData} />
      {operonData && (
        <Document operonData={operonData} section={section} />
      )}
    </div>
  )
}




