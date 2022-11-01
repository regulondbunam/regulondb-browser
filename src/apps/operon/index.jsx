import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataProvider } from "../../components/webservices/DataProvider";
import Home from "./home";
import Title, { UpdateTitle } from "./Title";
import Details from "./details";
import "./operon.css";

function Operon() {
  const [id, setId] = useState();
  const [_state, set_state] = useState();
  let { operonId, tuId } = useParams();

  let advancedSearch = `'${operonId}'[_id]`;
  if (tuId) {
    advancedSearch = `${tuId}[transcriptionUnits.id]`;
  }

  useEffect(() => {
    if (!operonId) {
      UpdateTitle({ title: "operon" });
    } else {
      switch (_state) {
        case "loading":
          UpdateTitle({ title: `Loading... ${operonId}`, state: _state });
          break;
        case "error":
          UpdateTitle({
            title: `Error to query ${operonId} information`,
            state: _state,
          });
          break;
        case "no results":
          UpdateTitle({
            title: `Error, Operon document with id ${operonId} was not found.`,
            state: "error",
          });
          break;
        default:
          UpdateTitle({ title: " ", state: _state });
          break;
      }
    }
    let idTest = operonId?operonId:tuId
    if (idTest !== id) {
      if (!id) {
        setId(idTest);
      } else {
        setId(undefined);
      }
    }
  }, [id, operonId,tuId, _state]);

  const viewHome = !operonId && !tuId;

  return (
    <div id="operon_app">
      <div id="operon_cover">
        <Title title={"Operon"} />
      </div>
      <div id="operon_content">
        {viewHome && <Home />}
        {id && (
          <DataProvider
            isGetRelatedIDs={true}
            isGetPhrases={true}
            datamart_name="getOperonBy"
            variables={{ advancedSearch: advancedSearch }}
            getState={(state) => {
              set_state(state);
            }}
          >
            {_state === "done" && <Details id_selected={tuId} />}
          </DataProvider>
        )}
      </div>
    </div>
  );
}

export default Operon;
