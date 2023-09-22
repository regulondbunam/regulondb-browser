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
import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useGetGenesBy } from "../../components/webservices";
import Title, { UpdateTitle } from "./components/Title";
import Information from './information';
import Home from "./Home";


export default function Gene() {
  let { geneId } = useParams();

  if (geneId) {
    if (geneId.split("_").length > 1) {
      geneId = geneId.split("_")[0]
    }
    return <GeneDescription geneId={geneId} />
  }
  return <Home />
}

function GeneDescription({ geneId }) {

  const [title, setTitle] = React.useState("gene");
  const { geneData, loading, error } = useGetGenesBy({ _id: geneId })
  console.log(geneData);
  useEffect(() => {
    if (loading) {
      UpdateTitle({ state: "loading" })
      setTitle("Loading gene data...")
    }
    if (geneData && !error) {
      UpdateTitle({ state: "done" })
    }
    if (geneData === null) {
      UpdateTitle({ state: "error" })
      setTitle(`Sorry, Gene:${geneId} don't found`)
    }
    if (error) {
      UpdateTitle({ state: "error" })
      setTitle(`Error to query ${geneId} information`)
    }
  }, [geneData, loading, error, geneId]);

  return (
    <div>
      <Title title={title} geneData={geneData} />
      {geneData && (
        <Information geneData={geneData} />
      )}
    </div>
  )
}