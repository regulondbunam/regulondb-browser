import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataProvider } from "../../components/webservices/DataProvider";
import Details from "./Details";
import Home from "./Home";
import Title, { UpdateTitle } from "./components/Title";
import "./gene.css";

function fragmentId(id = "") {
  if (id.match("_")) {
    return id.split("_")[0]
  }
  return id
}

function Gene() {
  const [id, setId] = useState();
  const [_state, set_state] = useState();
  let { geneId } = useParams();
  geneId = fragmentId(geneId)
  useEffect(() => {
    if (!geneId) {
      //console.log(`geneId`, geneId);
      UpdateTitle({ title: "Gene" });
    } else {
      switch (_state) {
        case "loading":
          UpdateTitle({ title: `Loading... ${geneId}`, state: _state });
          break;
        case "error":
          UpdateTitle({
            title: `Error to query ${geneId} information`,
            state: _state,
          });
          break;
        case "no results":
          UpdateTitle({
            title: `Error, document with id ${geneId} was not found.`,
            state: "error",
          });
          break;
        default:
          UpdateTitle({ title: " ", state: _state });
          break;
      }
    }
    if (geneId !== id) {
      if (!id) {
        setId(geneId);
      } else {
        setId(undefined);
      }
    }
  }, [id, geneId, _state]);

  return (
    <div>

      {!geneId && (
        <><div className="cover_gene" id="cover_gene_detailsA">
          <Title title={"Gene"} />
        </div><Home /></>)}
      {id && (
        <>
          <div className="cover_gene" id="cover_gene_detailsA">
            <Title title={"Gene"} />
          </div>
          <DataProvider
            datamart_name="getGenesBy"
            variables={{ advancedSearch: `'${id}'[_id]` }}
            getState={(state) => {
              //console.log("s_", state);
              set_state(state);
            }}
          >
            {_state === "done" && (
              <Details />
            )}
          </DataProvider>
        </>
      )}
    </div>
  );
}

export default Gene;
