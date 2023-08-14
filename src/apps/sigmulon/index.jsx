import React from "react";
import { useParams } from "react-router-dom";
import { useGetSigmulonById } from "../../components/webservices";
import Title from "./Title";
import Document from "./document";

function Sigmulon() {
  let { sigmulonId, promoterId } = useParams();

  if (sigmulonId) {
    return InformationBySigmulonID(sigmulonId)
  }
  return <div>home</div>;
}

export default Sigmulon;

function InformationBySigmulonID(sigmulonId) {
  const { loading, error, sigmulonData } = useGetSigmulonById(sigmulonId);
  let state = "",
    title = "";
  if (loading) {
    state = "loading";
    title = "loading... Sigmulon document with id " + sigmulonId;
  }
  if (error) {
    state = "error";
    title = "... Sorry, we have an error, try again later 🥲";
  }
  if (sigmulonData) {
    if (sigmulonData === null) {
      state = "error";
      title =
        "Error, regulon document with id " + sigmulonId + " was not found. 😞";
    } else {
      state = "done";
      title = undefined
    }
  }
  return(
    <div>
      <Title title={title} state={state} {...sigmulonData} />
      {!title && (
        <Document sigmulonData={sigmulonData} />
      )}
    </div>
  )
}
