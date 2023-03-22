import React from "react";
import {ParagraphCitations} from "../../../../../components/citations";

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
      <div>
        <h4>Gene Ontology Terms</h4>
      </div>
      <div>
        {CellularComponent(geneOntologyTerms?.cellularComponent, allCitations)}
        {MolecularFunction(geneOntologyTerms?.molecularFunction, allCitations)}
        {BiologicalProcess(geneOntologyTerms?.biologicalProcess, allCitations)}
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
          <tr className={"trShadow"} style={trStyle} key={`ccT_${component._id}`}>
            <td>{component.name}<ParagraphCitations citations={component.citations} allCitations={allCitations} /></td>
          </tr>
        );
      })}
    </tbody>
  );
}

