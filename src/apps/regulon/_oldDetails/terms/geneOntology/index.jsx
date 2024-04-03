/**
 # Component (user guide)

GeneOntologyTerms
	
## Description  
	
This is the main component and is responsible for rendering the information related to the Gene Ontology terms.

## Category   
	
Visual 

## Live demo 
--

## Installation or Implementation
--

## Usage 
--

## Props 

| Attribute       | Type | Default | Description                                                                                                                                                 |
| --------------- | ---- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
|geneOntologyTerms|object|         |It is used to provide data to the React component so that it can render and display relevant information about the Gene Ontology terms in the user interface.|
|allCitations     |array |         |Provides information on the sources or bibliographic references that support the Gene Ontology terms.                                                        |

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
React: Imports the main React library, which is used to create components and manage state.
ParagraphCitations: It is used to display and format citations or references to bibliographic sources in a paragraph format within the context of information related to Gene Ontology (GO) terms in the user interface.
CellularComponent: It is a function of the React component that is used to represent and display information about the "cell location" category of Gene Ontology terms.
MolecularFunction: It is a function within a React component that is used to display information about the "molecular function" category of Gene Ontology terms.
BiologicalProcess: It aims to present in a structured and readable way details about the biological processes in which specific genes or proteins are involved.
GeneOntologyItem: Its main function is to represent and display detailed information about a specific Gene Ontology term along with its corresponding citations or references to sources.

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name  | Description |  Syntax  | Additional Notes or References | 
| ------ | ----------- | -------- | ------------------------------ |
|        |             |          |                                |

 
**/

import React from "react";
import { ParagraphCitations, CITATION_SIZE } from "../../../../../components/datamartSchema/citations";

/**
 * Description placeholder
 *
 * @type {{ fontWeight: string; textAlign: string; }}
 */
const thStyle = {
  fontWeight: "bold",
  textAlign: "inherit",
};

/**
 * Description placeholder
 *
 * @type {{ textAlign: string; }}
 */
const trStyle = {
  textAlign: "inherit",
};

/**
 * Description placeholder
 *
 * @export
 * @param {{ geneOntologyTerms: any; allCitations: any; }} {
  geneOntologyTerms,
  allCitations
}
 * @returns {React.JSX}
 */
export default function GeneOntologyTerms({ geneOntology: geneOntologyTerms, allCitations }) {
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

/**
 * Description placeholder
 *
 * @param {Array} cc - An array of objects containing information about Gene Ontology terms
 *                     related to cellular location.
 * @param {Array} allCitations - An array of objects containing information about citations
 *                               or references to bibliographic sources supporting the Gene Ontology terms.
 *
 * @returns {React.JSX|null} - A JSX element representing the cellular location information and its citations,
 *                              or `null` if no information is available.
 */
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
            <table>{GeneOntologyItem(cc, allCitations)}</table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

/**
 * Description placeholder
 * @param {Array} cc - An array of objects containing information about Gene Ontology terms
 *                     related to molecular functions.
 * @param {Array} allCitations - An array of objects containing information about citations
 *                               or references to bibliographic sources supporting the Gene Ontology terms.
 *
 * @returns {React.JSX|null} - A JSX element representing the molecular function information and its citations,
 *                              or `null` if no information is available.
 */
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
            <table>{GeneOntologyItem(cc, allCitations)}</table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

/**
 * Description placeholder
 * @param {Array} cc - An array of objects containing information about Gene Ontology terms
 *                     related to molecular functions.
 * @param {Array} allCitations - An array of objects containing information about citations
 *                               or references to bibliographic sources supporting the Gene Ontology terms.
 *
 * @returns {React.JSX|null} - A JSX element representing the molecular function information and its citations,
 *                              or `null` if no information is available.
 */
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
            <table>{GeneOntologyItem(cc, allCitations)}</table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

/**
 * Description placeholder
 * @param {Array} components - An array of objects containing information about individual  Gene Ontology terms.
 * @param {Array} allCitations - An array of objects containing information about citations or references
 *                               to bibliographic sources supporting the Gene Ontology terms.
 *
 * @returns {React.JSX} - A JSX element representing the individual Gene Ontology terms and their associated citations.
 */
function GeneOntologyItem(components, allCitations) {
  //console.log(genes)
  return (
    <tbody>
      {components.map(
        /**
         * Description placeholder
         *
         * @param {object} component - An object containing information about an individual  Gene Ontology term.
         * @returns {React.JSX} - A JSX element representing the individual  Gene Ontology term and its associated citations.
         */
        (component) => {
          return (
            <tr
              className={"trShadow"}
              style={trStyle}
              key={`ccT_${component._id}`}
            >
              <td>
                <div style={{display: "flex"}} >
                  <div>{component.name}</div>
                  <div style={{marginLeft: "10px"}} >
                    <ParagraphCitations
                    citationSize={CITATION_SIZE.ONLY_INDEX}
                      citations={component.citations}
                      allCitations={allCitations}
                    />
                  </div>
                </div>
              </td>
            </tr>
          );
        }
      )}
    </tbody>
  );
}
