import React from 'react'
import {Accordion} from '../../../components/ui-components'
import Selected from './selected';
import Information from './information';

export default function GeneQuery({
  appState,
  dispatch,
  genesList
}) {
  console.log(appState);
  return (
    <div>
      <Accordion title={"Gene Select ("+appState.selectedGenes.length+")"}>
        <Selected geneList={genesList} selectedGenes={appState.selectedGenes} dispatch={dispatch} />
      </Accordion>
      <Accordion title={"Gene Information"}>
        <Information selectedGenes={appState.selectedGenes} genesInformation={appState.genesInformation} dispatch={dispatch} />
      </Accordion>
    </div>
  )
}
