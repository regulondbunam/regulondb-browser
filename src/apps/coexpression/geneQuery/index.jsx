import React from "react";
import { Accordion } from "../../../components/ui-components";
import Selected from "./selected";
import Information from "./information";
import LinearProgress from "@mui/material/LinearProgress";

export default function GeneQuery({
  deleteGene,
  genes,
  genesId,
  genesList,
  loadGeneState,
  selectGene,
  setDemo,
  reset
}) {
  //console.log(genes);
  return (
    <div>
      <Accordion title={"Gene Select (" + genesId.length + ")"}>
        <Selected
          geneList={genesList}
          genesId={genesId}
          selectGene={selectGene}
          deleteGene={deleteGene}
          setDemo={setDemo}
          reset={reset}
        />
      </Accordion>
      <Accordion title={"Gene Information"}>
        {!loadGeneState.loading ? (
          <Information genes={genes} />
        ) : (
          <LinearProgress
            variant="determinate"
            value={loadGeneState.loadState}
          />
        )}
      </Accordion>
    </div>
  );
}
/*

*/
