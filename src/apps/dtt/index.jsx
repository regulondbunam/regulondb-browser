import React from 'react'
import Tabs from "./tabs";
import RDBdata from './RDBdata';
import { useParams } from "react-router-dom";
import { Cover } from '../../components/ui-components'
import { secureRange } from './RDBdata/definitions';
/**
 * Description placeholder
 *
 * @type {array}
 */
const tabsInfo = [
  { id: "1", name: "RegulonDB-Data", disabled: false },
  //{ id: "2", name: "User Data", disabled: false },
];

export default function DrawingTracesInterface({ params, embed = false }) {
  let{ parameters} = useParams()
  
  let dataForm = undefined;
  if(parameters){
    parameters = new URLSearchParams(parameters);

    if (parameters.get("leftEndPosition") && parameters.get("leftEndPosition")) {
      try{
        dataForm = {
          covered: false,
          leftEndPosition: parseInt(parameters.get("leftEndPosition")),
          rightEndPosition: parseInt(parameters.get("rightEndPosition")),
          strand: "both",
          draw:true
        };
        if (!secureRange(dataForm.leftEndPosition,dataForm.rightEndPosition)) {
          alert("Incorrect positions, please check that the left position is smaller than the right position and that the difference is less than 100,000bp.")
          dataForm = {}
        }
      }catch{
        console.error("left or right position invalid");
      }
      
    }
  }

  const tabs = [
    <div id="1">
      <RDBdata dataForm={dataForm} />
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
