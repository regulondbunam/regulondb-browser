import React, {useState} from "react";
import { DNAfeatures } from "./operon_view/dnaFeaturesGL/dna_features";
import { GetInfo } from '../webServices/tu_ws'

const OperonSection = ({idOperon}) => {
    const [_data, set_data] = useState();
    const [_state, set_state] = useState();
    let loading = false;
    //console.log(_data)
    switch (_state) {
        case "loading":
            loading = true
            break;
        case "error":
            return <>error</>
        case "done":
            //console.log(_data)
            const posL = parseInt(_data.regulationPositions.leftEndPosition)
            const posR = parseInt(_data.regulationPositions.rightEndPosition)
            //return <>dibujito :3</>
            const infoDraw = [
                dna(posL-1000,posR+1000),
                operon(_data.id,_data.name,posL,posR,_data.strand)
            ]
            return <>{viewer(infoDraw)}</>
        default:
            break
    }
    return (
        <div>
            {
                loading ? <>loading...</> : null
            }
            <GetInfo id_operon={idOperon}
                resoultsData={(data) => { set_data(data) }}
                status={(state) => { set_state(state) }}
            />
        </div>
    )

};

export default OperonSection;


function viewer(infoDraw){
    
  return (
    <div id="section_Operon">
      <h2>Operon</h2>
      <div id="operon_Draw">
        <DNAfeatures
          id_drawPlace="operon_Draw"
          id_canvas="operon_canvas02"
          dnaFeatures_data={infoDraw}
        />
      </div>
    </div>
  );
}

function dna(posL,posR) {
    return {
        _id: "001A",
        labelFont: "",
        labelRGBColor: "",
        labelName: "DNA Line",
        labelSize: "12",
        leftEndPosition: posL,
        lineRGBColor: "255,0,200",
        lineType: "",
        lineWidth: "",
        objectType: "dna",
        objectRGBColor: "255,57,243",
        rightEndPosition: posR,
        strand: "forward",
        tooltip: "this a dna line..."
      }
}

function operon(id,name,posL,posR,strand){
    return {
        _id: id,
        objectType: "operon",
        labelName: name,
        leftEndPosition: posL,
        rightEndPosition: posR,
        strand: strand,
        objectRGBColor: "255,167,89",
        tooltip: `<p> d: ${id}  </p> <br/> Operon: ${name} <br/> leftEndPosition: ${posL} <br/> rightEndPosition: ${posR}  ` 
      }
}

/*

{
    _id: "001A",
    labelFont: "",
    labelRGBColor: "",
    labelName: "DNA Line",
    labelSize: "12",
    leftEndPosition: "100",
    lineRGBColor: "255,0,200",
    lineType: "",
    lineWidth: "",
    objectType: "dna",
    objectRGBColor: "255,57,243",
    rightEndPosition: "10000",
    strand: "forward",
    tooltip: "this a dna line..."
  },
  {
    _id: "Operon1",
    objectType: "operon",
    labelName: "hola",
    leftEndPosition: "250",
    rightEndPosition: "8000",
    strand: "reverse",
    objectRGBColor: "255,167,89",
    tooltip: "Operon B)"
  },
*/