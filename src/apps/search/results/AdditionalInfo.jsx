import React, { useEffect, useState } from "react";
import { Track } from "../../../components/GeneticElementsGraphicLibrary";
import RegulatoryNetwork from "../../../components/regulatoryNetwork/RegulatoryNetwork";
import WebServices from "../../../components/webservices/WebServices";

function AdditionalInfo({ additionalInfo, id }) {
  const [_GE, set_GE] = useState();
  const [_state, set_state] = useState();

  useEffect(() => {
    let drawPlace = document.getElementById(`drawGE_${id}`);
    if (drawPlace && _GE) {
      let width = drawPlace.clientWidth;
      let height = 200
      const drawGenes = new Track({
        id: `drawGE_${id}`,
        canva_id:  `canvaGE_${id}`,
        width: width,
        height: height,
      });
      //console.log(_GE);
      drawGenes.draw(_GE);
    }
  }, [_GE, id]);

  let leftEndPosition = additionalInfo.leftEndPosition - 1000;
  let rightEndPosition = additionalInfo.rightEndPosition + 1000;
  if (leftEndPosition < 0) {
    leftEndPosition = 0;
  }
  let variables = {
    leftEndPosition: leftEndPosition,
    rightEndPosition: rightEndPosition,
  };
  switch (additionalInfo.type) {
    case "ge_draw":
      return (
        <div>
          {!_GE && (
            <WebServices
              datamart_name="getGeneticElementsFromInterval"
              variables={variables}
              getData={(data) => {
                set_GE(data.GE);
              }}
              getState={(state) => {
                set_state(state);
              }}
            />
          )}
          {_state === "loading" && <div>Loading...</div>}
          <div id={`drawGE_${id}`} style={{ overflow: "auto" }} />
        </div>
      );
    case "rn_draw":
      console.log(id);
      return(
        <div>
          <RegulatoryNetwork id_regulon={id} />
        </div>
      )
    default:
      return null
  }
  
}

export default AdditionalInfo;
