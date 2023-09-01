/**
 # Component (user guide)

# Label
	
## Description  
	
This component is responsible for generating citation tags in a particular format for a specific publication and evidence.

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
|publication|Object|         |It is a type Publication of datamart|
| evidence  |Object|         |It's a type Evidence of datamart|
| index     |Object|         |Track the position of the citation in the citation list or matrix.|
| small     |Object|         |Decide whether the size of the citation is small or not.|


## Exception
--

## License

MIT License

## Author 
	
RegulonDB Team: 
Francisco Javier Hernandez Sanchez

# Component (technical guide)

## Component Type 

[Visual]

## Dependencies
--

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name  | Description |  Syntax  | Additional Notes or References | 
| ------ | ----------- | -------- | ------------------------------ |
|        |             |          |                                |


 **/


/**
 * Citation label in specific format
 * @date 30/5/2023 - 21:00:25
 * @author Gabriel Alarcon Carranza <galarcon@ccg.unam.mx>
 * @export
 * @param {number} index citation index
 * @param {object} publication is a type Publication of datamart
 * @param {object} evidence is a type Evidence of datamart
 * @param {boolean} [small=true] format of label
 * @returns {String}
 */
export function labelCitation({publication = {}, evidence = {}, small = true, index}) {
    //console.log(publication, evidence);
    
   
    const {
        authors,
        citation,
        //pmid,
        //title,
        //url,
        year, } = publication
    
    /**
     * Description placeholder
     *
     * @type {boolean}
     */
    const code = evidence?.code

    
    /**
     * Description placeholder
     *
     * @type {string}
     */
    const numIndex = index ? `[${index}]` : ""
    //W->weak S->strong


    
    /**
     * Description placeholder
     *
     * @returns {string}
     */
    const codeLabel = () => {
        if (code) {
            if (evidence.type === 'S') {
                return `Evidence: <b>[${code}]</b>`
            }
            return `Evidence: [${code}]`
        }
        return ''
    }
    if (small) {
        if (!authors) {
            return `${numIndex} ${codeLabel()}`.trim()
        }
        if (authors[0]) {
            return `${numIndex} ${authors[0]}., et al. ${year ? year : ''} ${codeLabel()}`
        }
        return `${numIndex} ${codeLabel()}`.trim()
    }
    return `${numIndex} ${citation ? `${citation},` : ''} ${codeLabel()}`
    // [i]autor., et al. año [evidence]
}