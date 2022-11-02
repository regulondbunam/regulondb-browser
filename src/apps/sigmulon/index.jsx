import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataProvider } from "../../components/webservices/DataProvider";
import Home from "./home";
import Title, { UpdateTitle } from "./Title";
import Details from "./details";


function Sigmulon() {
  const [id, setId] = useState();
  const [_state, set_state] = useState();
  let { sigmulonId, promoterId } = useParams();

  let advancedSearch = `'${sigmulonId}'[_id]`;
  if (promoterId) {
    advancedSearch = `${promoterId}[transcribedPromoters._id]`;
  }

  useEffect(() => {
    if (!sigmulonId) {
      UpdateTitle({ title: "sigmulon" });
    } else {
      switch (_state) {
        case "loading":
          UpdateTitle({ title: `Loading... ${sigmulonId}`, state: _state });
          break;
        case "error":
          UpdateTitle({
            title: `Error to query ${sigmulonId} information`,
            state: _state,
          });
          break;
        case "no results":
          UpdateTitle({
            title: `Error, sigmulon document with id ${sigmulonId} was not found.`,
            state: "error",
          });
          break;
        default:
          UpdateTitle({ title: " ", state: _state });
          break;
      }
    }
    let idTest = sigmulonId?sigmulonId:promoterId
    if (idTest !== id) {
      if (!id) {
        setId(idTest);
      } else {
        setId(undefined);
      }
    }
  }, [id, sigmulonId, promoterId, _state]);

  const viewHome = !sigmulonId && !promoterId;

  return (
    <div id="sigmulon_app">
      <div id="sigmulon_cover">
        <Title title={"sigmulon"} />
      </div>
      <div id="sigmulon_content">
        {viewHome && <Home />}
        {id && (
          <DataProvider
            isGetRelatedIDs={true}
            isGetPhrases={true}
            datamart_name="getSigmulonBy"
            variables={{ advancedSearch: advancedSearch }}
            getState={(state) => {
              set_state(state);
            }}
          >
            {_state === "done" && <Details promoterId={promoterId} />}
          </DataProvider>
        )}
      </div>
    </div>
  );
}

export default Sigmulon;
