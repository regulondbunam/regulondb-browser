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
import { query_getSumaryHistoryData } from "./query"
import { useQuery } from '@apollo/client';
//import graphView from "./graphView"
import TableView from "./tableView";
import { Cover } from "../../components/ui-components"

export default function SummaryHistory() {

    const { loading, error, data } = useQuery(query_getSumaryHistoryData);

    if (loading) {
        return <Cover state={"loading"} >
            <h1>loading...</h1>
        </Cover>
    }
    if (error) return `Error! ${error.message}`

    if (data) console.log(data);
    return (
        <div>
            <Cover >
                <h1>Summary History</h1>
            </Cover>
            <TableView arraySummary={data.getDatabaseInfo} />
        </div>
    )
}
//<graphView/>