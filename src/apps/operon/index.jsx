import React from "react";
import { useParams } from "react-router-dom";
import "./operon.css";
import Home from "./home";
import { useGetOperonByID, useGetOperonByTuId } from "../../components/webservices";
import Title from "./Title";
import Document from "./document";


export default function Operon() {
  let { operonId, tuId, section } = useParams();
  if (!operonId && !tuId) {
    return <Home />
  }
  if (tuId) {
    return <RedirectToOperon tuId={tuId} />
  }
  if (operonId) {
    return <LoadOperon operonId={operonId} section={section} />
  }
  return null
}

function RedirectToOperon({ tuId }) {
  const { operonData, loading, error } = useGetOperonByTuId({ _tuId: tuId })

  let state = "done"
  let title = "Validating TU id " + tuId
  if (loading) {
    state = "loading"
    title = "loading... Validating TU id " + tuId
  }
  if (error) {
    state = "error"
    title = "... Sorry, we have an error, try again later 🥲"
  }
  if (operonData) {
    if (operonData === null) {
      state = "error"
      title = "Error, Operon document with TU id was not found. 😞"
    } else {
      state = "done"
      title = operonData.operon.name
      if (operonData?._id) {
        window.history.pushState({},'RegulonDB','/operon/'+operonData._id+"/tu_"+tuId);
      }
    }
  }

  return (
    <div>
      <Title state={state} title={title} operonData={operonData} />
      {operonData && (
        <Document operonData={operonData}/>
      )}
    </div>
  )
}

function LoadOperon({ operonId, section }) {
  const { operonData, loading, error } = useGetOperonByID({ _id: operonId })
  let state = "done"
  let title = "Operons"
  if (loading) {
    state = "loading"
    title = "loading... Operon document with id "+operonId
  }
  if (error) {
    state = "error"
    title = "... Sorry, we have an error, try again later 🥲"
  }
  if (operonData) {
    if (operonData === null) {
      state = "error"
      title = "Error, Operon document with id "+operonId+" was not found. 😞"
    } else {
      state = "done"
      title = operonData.operon.name
    }
  }
  return (
    <div>
      <Title state={state} title={title} operonData={operonData} />
      {operonData && (
        <Document operonData={operonData} section={section} />
      )}
    </div>
  )
}




