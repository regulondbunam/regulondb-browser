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
import React from 'react'
import { useParams } from "react-router-dom";
import Title from './components/Title';
import Main from './mainPage/Main'
import Dataset from './datasetPage/Dataset';
import Finder from './finderPage/Finder'




export default function HT(params) {
    const datasetType = useParams().datasetType;
    const site = useParams().site;
    const info = useParams().info;
    return <HtParameters datasetType={datasetType} site={site} info={info} />
}

export function HtParameters({datasetType,info,site,isEmbed = false}) {

    if(isEmbed){
        window.IN_URL = {
            main: "/embed/ht",
            finder: "/embed/ht/finder/",
            dataset: "/embed/ht/dataset/",
            isEmbed: isEmbed,
          } 
    }else{
        window.IN_URL = {
            main: "/ht",
            finder: "/ht/finder/",
            dataset: "/ht/dataset/",
            isEmbed: isEmbed,
          } 
    }

    let Page = <Main />

    if(datasetType){
        switch (site) {
            case "finder":
                Page = <Finder datasetType={datasetType} />
                    break;
            case "dataset":
                const query = new URLSearchParams(info);
                Page = <Dataset datasetId={query.get('datasetId')} datasetType={datasetType} experimentType={query.get('experimentType')} />
                    break;
            default:
                Page = <Main />
        }
    }

    return(
        <div>
            <Title />
            {Page}
        </div>
    )
    
}
