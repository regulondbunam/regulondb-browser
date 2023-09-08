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
import { ParagraphCitations } from "../../../citations";

const thStyle = {
  fontWeight: "bold",
  textAlign: "inherit",
};
const trStyle = {
  textAlign: "inherit",
};

export default function GeneOntologyTerms({
  geneOntologyTerms,
  allCitations
}) {
  //console.log(geneOntology)
  if (!geneOntologyTerms) {
    return null;
  }
  return (
    <div>
      {CellularComponent(geneOntologyTerms?.cellularComponent, allCitations)}
      {MolecularFunction(geneOntologyTerms?.molecularFunction, allCitations)}
      {BiologicalProcess(geneOntologyTerms?.biologicalProcess, allCitations)}
    </div>
  );
}

function CellularComponent(cc, allCitations) {
  //console.log(cc)
  if (!cc || cc.length === 0) {
    return null;
  }
  return (
    <table style={{ margin: "1% 0% 0px 1%" }}>
      <thead>
        <tr style={thStyle}>
          <th>
            <h4 style={{ margin: "0" }}>Cellular Component</h4>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <table>
              {GeneOntologyItem(cc, allCitations)}
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function MolecularFunction(cc, allCitations) {
  if (!cc || cc.length === 0) {
    return null;
  }
  return (
    <table style={{ margin: "1% 0% 0px 1%" }}>
      <thead>
        <tr style={thStyle}>
          <th>
            <h4 style={{ margin: "0" }}>Molecular Function</h4>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <table>
              {GeneOntologyItem(cc, allCitations)}
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function BiologicalProcess(cc, allCitations) {
  if (!cc || cc.length === 0) {
    return null;
  }
  return (
    <table style={{ margin: "1% 0% 0px 1%" }}>
      <thead>
        <tr style={thStyle}>
          <th>
            <h4 style={{ margin: "0" }}>Biological Process</h4>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <table>
              {GeneOntologyItem(cc, allCitations)}
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function GeneOntologyItem(components, allCitations) {
  //console.log(genes)
  return (
    <tbody>
      {components.map((component) => {
        return (
          <tr className={"trShadow"} style={trStyle} key={`ccT_${component._id}`}>
            <td>
              <div>
                <div>
                {component.name}
                </div>
                <div>
                  <ParagraphCitations citations={component.citations} allCitations={allCitations} />
                </div>
              </div>
            </td>

          </tr>
        );
      })}
    </tbody>
  );
}

