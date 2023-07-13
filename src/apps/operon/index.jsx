import React from "react";
import { useParams } from "react-router-dom";
import "./operon.css";
import Home from "./home";
import { useGetOperonByID, useGetOperonByTuId } from "../../components/webservices";

export default function Operon() {
  let { operonId, tuId } = useParams();
  if (!operonId && !tuId) {
    return <Home />
  }
  return null
}

function RedirectToOperon({ tuId }) {

}

function Document({ operonId }) {

}


