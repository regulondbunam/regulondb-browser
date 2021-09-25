import React, {useState} from "react";
import {SpinnerCircle } from "../ui-components/ui_components";
import GetGeneInfo from "./webServices/getGeneInfo";
import GetGeneticElements from "./webServices/getGeneticElements";

const DttTool = ({ id_gene }) => {

    const [_data, set_data] = useState()
    const [_state, set_state] = useState()
    const [_data_dtt, set_data_dtt] = useState()
    const [_state_dtt, set_state_dtt] = useState()

    if (_data_dtt) {
        return(
            <div>
                HOLA
            </div>
        )
    }

    if(_data){
        console.log(_data)
        return(
            <div>
            {
                _state_dtt !== "error"
                ?<SpinnerCircle />
                :<div>error to load Drawing Tracces info</div>
            }
            <GetGeneticElements 
            leftEndPosition={_data.leftEndPosition}
            rightEndPosition={_data.rightEndPosition} 
                resoultsData={(data)=>{set_data_dtt(data)}}
                status={(state)=>set_state_dtt(state)}
            />
        </div>
        )
    }

    return (
        <div>
            {
                _state !== "error"
                ?<SpinnerCircle />
                :<div>error to load Drawing Gene Information</div>
            }
            <GetGeneInfo id_gene={id_gene} 
                resoultsData={(data)=>{set_data(data)}}
                status={(state)=>set_state(state)}
            />
        </div>
    )
};

export default DttTool;

/*
function loadDraw(gene_data, id_drawPlace, idCanvas) {
    try {
      const posLeft = gene_data?.leftEndPosition - 1000;
      const posRight = gene_data?.rightEndPosition + 1000;
      return (
        <Dtt
          posLeft={posLeft}
          posRight={posRight}
          id_drawPlace={id_drawPlace}
          idCanvas={idCanvas}
          gene_data={gene_data}
        />
      );
    } catch (error) {
      console.log(error);
      return <>erro to draw</>;
    }


}
*/