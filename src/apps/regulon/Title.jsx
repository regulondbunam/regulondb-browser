import React from "react";
import { Cover, DataVerifier } from "../../components/ui-components";
//const IDTitle = "title_cover_regulonTool";
//export {IDTitle}
//const eventName = "cover_regulonTool_event";


export function Title({ state, title, message, regulator = {} }) {

  const {
    citations,
    confidenceLevel,
    conformations,
    encodedFrom,
    // name,
    note,
    products,
    siteLength,
    symmetry,
    synonyms,
    type,
  } = regulator

  return (
    <div >
      <Cover state={state} message={message}>
        <h1 style={{ margin: "0px", padding: "10px 0px 10px 0px" }} >{title}</h1>
        <div style={{display: "flex"}} >
          <div>
            {DataVerifier.isValidArray(synonyms) && (
              <p><b>Synonyms: </b>{synonyms.map(s => (s)).join(", ")}</p>
            )}
            {DataVerifier.isValidArray(siteLength) && (
              <p><b>Site Length; </b>{siteLength.map(s => (s)).join(", ")}</p>
            )}
            {DataVerifier.isValidArray(symmetry) && (
              <p><b>Symmetry: </b>{symmetry.map(s => (s)).join(", ")}</p>
            )}
            {DataVerifier.isValidString(type) && (
              <p><b>Type: </b>{type}</p>
            )}
          </div>
          <div style={{marginLeft: "2%"}} >
            {DataVerifier.isValidArray(conformations) && (
              <>
              <p><b>Conformations:</b></p>
              {
                conformations.map((conformation=>(<Conformation key={conformation._id} {...conformation}  />)))
              }</>
            )}
          </div>
        </div>
        <br />
      </Cover>
    </div>
  );
};

export default Title;

function Conformation({
  _id = "",
  additiveEvidences = [],
  citations = [],
  confidenceLevel = "",
  effector,
  effectorInteractionType = "",
  functionalType = "",
  name = "",
  note = "",
  type = "",
}) {
  return <p><b>{name}</b>({type})</p>
}

