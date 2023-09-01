import React from 'react'
import {Accordion} from '../../../components/ui-components'
import Selected from './selected';
import Information from './information';

export default function GeneQuery({
  deleteGene,
  genes,
  genesId,
  genesList,
  loadGeneState,
  selectGene
}) {
  //console.log(genes);
  return (
    <div>
      <Accordion title={"Gene Select ("+genesId.length+")"}>
        <Selected geneList={genesList} genesId={genesId} selectGene={selectGene} deleteGene={deleteGene} />
      </Accordion>
      {!loadGeneState.loading ? (
        <Accordion title={"Gene Information"}>
        <Information genes={genes} />
      </Accordion>
      ):(
        <div>Loading</div>
      )}
      
    </div>
  )
}
/*

*/