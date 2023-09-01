/**
 # Component (user guide)

# AllCitations
	
## Description  
	
AllCitations takes a list of citations, presents them in a table and displays them using the ModalCitation component.

## Category   
	
[Visual]  

## Live demo 
	
[code to iframe CodeSandbox]

## Installation or Implementation

[example: npm install --save react-awesome-button]

## Usage 
	
[example: <AllCitations allCitations = {[]} small = {isSmall}/> ]

## Props 

| Attribute  | Type  | Default | Description                                             |
| ---------  | ----  | ------- | ------------------------------------------------------- |
|allCitations|array  |         | Citations'  list to show in the component AllCitations. |
|   small    |boolean|         | Decide whether the size of the citation is small or not.|

## Exception

__Category: [Error]__
If there is an error while rendering, it is caught in the catch block and the function returns null.


## License

MIT License

## Author 
	
RegulonDB Team: 
Francisco Javier Hernandez Sanchez


# Component (technical guide)

## Component Type 

[Visual]

## Dependencies
ModalCitation: The list of citations is rendered inside the "ModalCitation" component, evidence, publication, index and small are passed as props to create the modal citation.

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name  | Description |  Syntax  | Additional Notes or References | 
| ------ | ----------- | -------- | ------------------------------ |
|        |             |          |                                |


 **/

import { ModalCitation } from "./modal";


/**
 * Description placeholder
 * @export
 * @param {{ allCitations: any; small?: boolean; }} { allCitations, small = false }
 * @returns {React.JSX}
 */

export function AllCitations({ allCitations, small = false }) {
  if (!allCitations) {
    return null;
  }
  return (
    <>
      <table>
        <tbody>
          {
          
            allCitations.map(
                /** 
              @param {Object} cit - Citation object to be rendered
              @param {number} index - Index of the citation in the list.
              @returns {JSX.Element|null} JSX element representing the table row with the rendered citation or null in case of error.
            **/
              (cit, index) => {
            try {
              return (
                <tr key={`citation_no_000${index}`}>
                  <td>
                    <ModalCitation
                      evidence={cit.evidence}
                      publication={cit.publication}
                      index={index + 1}
                      small={small}
                    />
                  </td>
                </tr>
              );
            } catch (error) {
              return null;
            }
          })}
        </tbody>
      </table>
      <br />
      <br />
    </>
  );
}
