import {  DataVerifier } from "../../../components/ui-components";
import {MapReactions} from './reactions';
//import GeneOntology from './geneOntology';

export default function GuInfo({
  idSite, 
  gensorUnit,
  reactions,
  nReactions
}) {
  if(DataVerifier.isValidArray(reactions)){
    return (
      <MapReactions idSite={idSite} reactions={reactions} nodes={gensorUnit.components} name={gensorUnit.name} />
    )
  }
  return <div>error... no reactions</div>
}


/* 
const sections = useMemo(()=>{
    let _sections = []
    const {
      biologicalProcess,
      cellularComponent,
      molecularFunction
    } = gensorUnit.geneOntology
    console.log(gensorUnit);
    if(DataVerifier.isValidArray(reactions)){
      _sections.push({
        id: "gi_section1_reactions",
        label: `Reactions (${nReactions})`,
        title: `Reactions (${nReactions})`,
        component: (
          <div >
            <Reactions reactions={reactions} nodes={gensorUnit.components} />
          </div>
        ),
      });
    }
    if(DataVerifier.isValidArray(biologicalProcess) || DataVerifier.isValidArray(cellularComponent) || DataVerifier.isValidArray(molecularFunction)){
      _sections.push({
        id: "gi_section2_geneOntology",
        label: `Gene Ontology`,
        title: `Gene Ontology`,
        component: (
          <div >
           <GeneOntology {...gensorUnit.geneOntology}/>
          </div>
        ),
      });
    }
    return _sections
  },[reactions, nReactions, gensorUnit])
*/