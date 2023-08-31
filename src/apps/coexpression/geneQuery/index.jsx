import React from 'react'
import {Accordion} from '../../../components/ui-components'
import Selected from './selected';
import Information from './information';

export default function GeneQuery({
  genes,
  genesId,
  genesList,
  selectGene
}) {
  //console.log(state);
  return (
    <div>
      <Accordion title={"Gene Select ("+genesId.length+")"}>
        <Selected geneList={genesList} genesId={genesId} selectGene={selectGene} />
      </Accordion>
    </div>
  )
}
/*
<Accordion title={"Gene Information"}>
        <Information selectedGenes={appState.selectedGenes} genesInformation={appState.genesInformation} dispatch={dispatch} />
      </Accordion>
*/