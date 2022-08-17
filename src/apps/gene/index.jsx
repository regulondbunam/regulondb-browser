import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataProvider } from "../../components/webservices/DataProvider";
import Details from "./Details";
import Title, { UpdateTitle } from "./components/Title";
import "./gene.css";

function Gene() {
  const [id, setId] = useState();
  const [_state, set_state] = useState();
  let { geneId } = useParams();

  useEffect(() => {
    if (!geneId) {
      UpdateTitle({ title: "Gene" });
    } else {
      switch (_state) {
        case "loading":
          UpdateTitle({ title:  `Loading... ${geneId}`, state: _state });
          break;
        case "error":
          UpdateTitle({ title:  `Error to query ${geneId} information`, state: _state });
          break;
        default:
          UpdateTitle({ title:  " ", state: _state });
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
       <div className="cover_gene" id="cover_gene_detailsA" >
        <Title title={"Gene"} />
       </div>
      {!geneId && <div>no id</div>}
      {id && (
        <DataProvider
          datamart_name="getGenesBy"
          variables={{ advancedSearch: `'${id}'[_id]` }}
          getState={(state) => {
            set_state(state);
          }}
        >
          <Details />
        </DataProvider>
      )}
    </div>
  );
}

export default Gene;
