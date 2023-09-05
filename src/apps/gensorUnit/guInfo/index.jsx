import React, { useMemo } from 'react'
import { AnchorNav, DataVerifier } from "../../../components/ui-components";
import Reactions from './reactions';

export default function GuInfo({
  gensorUnit,
  reactions,
  nReactions
}) {

  const sections = useMemo(()=>{
    let _sections = []
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
    return _sections
  },[reactions, nReactions, gensorUnit])

  return <AnchorNav
  sections={sections}
  title={`Gensor Unit ${gensorUnit.name}`}
/>
}
