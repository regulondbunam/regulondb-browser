import React from 'react'
import {Accordion} from '../../../components/ui-components'
import Selected from './selected';

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

      </Accordion>
    </div>
  )
}
