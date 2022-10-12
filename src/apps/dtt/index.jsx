import { Tabs } from "./tabs/tabs";
import { useParams } from "react-router-dom";
import UserData from "./user_data";
import RDBdata from "./rdb_data";
import DDTE from "./embed";
import Title from "./title";

const tabsInfo = [
  { id: "1", name: "RegulonDB-Data", disabled: false },
  { id: "2", name: "User Data", disabled: false },
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

function DrawingTracesInterface({ params, embed = false }) {
  let parameters = new URLSearchParams(useParams().parameters);

  if (embed === true) {
    return <DDTE params={params} />;
  }
  
  let dataForm = undefined;
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

  const tabs = [
    <div id="1">
      <RDBdata dataForm={dataForm} />
    </div>,
    <div id="2">
      <UserData></UserData>
    </div>,
  ];

  return (
    <div>
      <Title title={"Drawing Traces Tool"} />
      <Tabs tabSelect={"1"} tabsInfo={tabsInfo} tabs={tabs} />
    </div>
  );
}

export default DrawingTracesInterface;
