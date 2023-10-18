import React from "react";
import { DataVerifier } from "../../components/ui-components";

export default function Term({
  name,
  definition,
  oboId,
  externalCrossReferences,
  iri,
  _id,
  hasDbXRef,
  hasOboNameSpace,
  hasRelatedSynonyms,
  synonyms,
}) {
  return (
    <div>
      <p>{_id}</p>
      <h2>{name}</h2>
      {DataVerifier.isValidArray(synonyms) && (
        <p>{synonyms.join(", ")}</p>
      )}
      <p>{oboId}</p>
      {DataVerifier.isValidArray(hasDbXRef)&&(
        <p>{hasDbXRef.join(", ")}</p>
      )}
      {hasOboNameSpace && (
        <p>{hasOboNameSpace}</p>
      )}
      {DataVerifier.isValidArray(hasRelatedSynonyms) && (
        <p>{hasRelatedSynonyms.join(", ")}</p>
      )}
      {definition && <p>{definition.text}</p>}
      <a href={iri} target="_blank" rel="noopener noreferrer">
        obolibrary.org
      </a>
      {DataVerifier.isValidArray(externalCrossReferences) && (
       <>
       <p><b>External Cross References:{" "}</b></p>
       {externalCrossReferences.map((er)=>{
        return  <p key={er.externalCrossReferences_id} >{er.objectId}</p>
       })}
       </>
      )}
    </div>
  );
}
