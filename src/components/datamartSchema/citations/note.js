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

import { labelCitation } from "./label"


/**
 * Description placeholder
 * @export
 * @param {object} allCitations - An object of all available citations.
 * @param {string} idCit - The identifier of the citation to search for.
 * @param {boolean} [small=true] - Indicates whether the citation reference will be small.
 * @returns {string}
 */
export function relCitation(allCitations, idCit, small = true) {
    const re = /RDBECOLI(PRC|EVC)[0-9]{5}/
    if (!re.exec(idCit)) {
        return ""
    }
    
    /**
     * Description placeholder
     * @type {string}
     */
    const id_cit = re.exec(idCit)[0]

    
    /**
     * Description placeholder
     * @type {string}
     */
    let index

    
    try {
        index = allCitations.findIndex(element => element?.publication?._id === id_cit)
        if (!index) {
            return ""
        }
    } catch (error) {
        console.error("error: "+idCit,error);
        return ""
    }

    
    /**
     * Description placeholder
     *
     * @type {*}
     */
    const fullCit = allCitations[index]

    
    /**
     * Description placeholder
     *  
     * @type {string}
     */
    let publication = ""

    
    /**
     * Description placeholder
     *
     * @type {string}
     */
    let url = ""
    if (fullCit?.publication) {
        publication = fullCit?.publication?.citation 
        url = fullCit?.publication?.url  
    }else{
        console.log(index);
        return ""
    }
    return `<a class='citation' data-tip='${publication}' target="_blank" rel="noopener noreferrer" href="${url}">${labelCitation({ publication: fullCit.publication, evidence: fullCit.evidence, index: index+1 })}</a>&nbsp;`
}


/**
 * Description placeholder
 *
 * @param {*} allCitations - An object of all available citations.
 * @param {*} note - The note that may contain citation references.
 * @returns {string}
 */
export const NoteCitations = (allCitations, note) => {
    
    /**
     * Description placeholder
     *
     * @type {{}}
     */
    const REX = /\[\s*RDBECOLI(PRC|EVC)[0-9]{5}\]/

    
    /**
     * Description placeholder
     *
     * @type {{}}
     */
    const PP = /(\|CITS:)|\|\./

    
    /**
     * Description placeholder
     *
     * @type {{}}
     */
    const BR = /(\r\n|\r|\n)/
    while (BR.exec(note)) {
        note = note.replace(BR, '<br></br>')
        console.log("a");
    };
    if (PP.exec(note)) {
        while (PP.exec(note)) {
            note = note.replace(PP, ' ')
        };
        while (REX.exec(note)) {
            note = note.replace(REX, relCitation(allCitations, REX.exec(note)[0]))
        };
    }
    
    return note
}