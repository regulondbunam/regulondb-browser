import React from "react";
import {ParagraphCitations} from "../../../../../components/citations";

const thStyle = {
  fontWeight: "bold",
  textAlign: "inherit",
};
const trStyle = {
  textAlign: "inherit",
};

export default function GeneOntology({
  geneOntology,
  allCitations
}) {
  //console.log(geneOntology)
  if (!geneOntology) {
    return null;
  }
  return (
    <div>
      <div>
        <h3>Gene Ontology Terms</h3>
      </div>
      <div>
        {CellularComponent(geneOntology?.cellularComponent, allCitations)}
        {MolecularFunction(geneOntology?.molecularFunction, allCitations)}
        {BiologicalProcess(geneOntology?.biologicalProcess, allCitations)}
      </div>
    </div>
  );
}

function CellularComponent(cc, allCitations) {
  //console.log(cc)
  if (!cc || cc.length === 0) {
    return null;
  }
  return (
    <table style={{ margin: "1% 0% 0px 5%" }}>
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
    <table style={{ margin: "1% 0% 0px 5%" }}>
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
    <table style={{ margin: "1% 0% 0px 5%" }}>
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
          <tr className={"trShadow"} style={trStyle} key={`ccT_${component.term_id}`}>
            <td>{component.name}<ParagraphCitations citations={component.citations} allCitations={allCitations} /></td>
          </tr>
        );
      })}
    </tbody>
  );
}

