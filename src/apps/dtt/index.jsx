import React from 'react'
import Tabs from "./tabs";
import RDBdata from './RDBdata';
import { useParams } from "react-router-dom";
import { Cover } from '../../components/ui-components'

/**
 * Description placeholder
 *
 * @type {array}
 */
const tabsInfo = [
  { id: "1", name: "RegulonDB-Data", disabled: false },
  //{ id: "2", name: "User Data", disabled: false },
];

const geneticElements = [
  "gene",
  "promoter",
  "operon",
  "tf binding site",
  "rna",
  "riboswitch",
  "transnational_attenuator",
  "transcriptional_attenuator",
  "ppGpp",
];

export default function DrawingTracesInterface({ params, embed = false }) {
  let{ parameters} = useParams()
  let dataForm = undefined;
  if(parameters){
    parameters = new URLSearchParams();
    if (parameters.get("leftEndPosition") && parameters.get("leftEndPosition")) {
      try{
        dataForm = {
          covered: false,
          leftEndPosition: parseInt(parameters.get("leftEndPosition")),
          objectType: geneticElements,
          rightEndPosition: parseInt(parameters.get("rightEndPosition")),
          strand: "both",
        };
      }catch{
        console.error("left or right position invalid");
      }
      
    }
  }

  const tabs = [
    <div id="1">
      <RDBdata />
    </div>,
    <div id="2">
      userData
    </div>,
  ];

  return (
    <div>
      <Cover>
        <h1>Drawing Traces Tool</h1>
      </Cover>
      <Tabs tabSelect={"1"} tabsInfo={tabsInfo} tabs={tabs} />
    </div>
  )
}
