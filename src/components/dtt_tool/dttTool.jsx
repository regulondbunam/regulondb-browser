import React, { useState, useEffect } from "react";
import { SpinnerCircle } from "../ui-components/ui_components";
import GetGeneInfo from "./webServices/getGeneInfo";
import GetGeneticElements from "./webServices/getGeneticElements";
import DrawingTracesTool from "./drawingTracesTool/drawing_traces_tool";

const DttTool = ({ id, context = "DNA" }) => {

    const [_data, set_data] = useState()
    const [_state, set_state] = useState()
    const [_expand, set_expand] = useState(false)
    const [_data_dtt, set_data_dtt] = useState()
    const [_state_dtt, set_state_dtt] = useState()
    const [_posLeft, set_posLeft] = useState()
    const [_posRight, set_posRight] = useState()

    useEffect(() => {
        let drawPlace = document.getElementById(`divCanvas_${context}Context${id}`)
        if (drawPlace) {
            //, , , id, true, true
            DrawingTracesTool({
                idDrawPlace: `divCanvas_${context}Context${id}`,
                idCanvas: `idContextCanva${id}`,
                dnaFeatures_data: _data_dtt,
                auto_adjust: true,
                covered: true,
                covered_LeftPosition: _posLeft,
                covered_RightPosition: _posRight
            })
            drawPlace.scrollTo(0, 150)
        }
    }, [id, context, _data_dtt,_posRight,_posLeft])


    if (_data_dtt) {
        //console.log(_data_dtt)

    }

    if (_data?.leftEndPosition) {
        let move = parseInt(`${(_posRight-_posLeft)*0.15}`,10)
        let zoom = parseInt(`${(_posRight-_posLeft)*0.25}`,10)
        return (
            <table style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>
                            <button className="iconButton"
                                onClick={() => {
                                    set_data_dtt(undefined)
                                    set_posLeft(_posLeft - move)
                                    set_posRight(_posRight - move)
                                }}
                            >
                                <i className="bx bxs-left-arrow" type="solid" />
                            </button>
                            <button className="iconButton"
                                onClick={() => {
                                    set_data_dtt(undefined)
                                    set_expand(true)
                                    set_posLeft(_posLeft + zoom)
                                    set_posRight(_posRight - zoom)
                                }}
                            >
                                <i className='bx bxs-zoom-in' ></i>
                            </button>
                            <button className="iconButton"
                                 onClick={() => {
                                    set_data_dtt(undefined)
                                    set_posLeft(_posLeft - zoom)
                                    set_posRight(_posRight + zoom)
                                }}
                            >
                                <i className='bx bxs-zoom-out bx-flip-horizontal' ></i>
                            </button>
                            <button className="iconButton"
                                onClick={() => {
                                    set_data_dtt(undefined)
                                    set_posLeft(_posLeft + move)
                                    set_posRight(_posRight + move)
                                }}
                            >
                                <i className='bx bxs-right-arrow' type="solid"></i>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {
                                _data_dtt
                                    ? <div style={{ overflow: "auto", height: "200px" }} id={`divCanvas_${context}Context${id}`} />
                                    : <div style={{ overflow: "auto", height: "200px" }}>
                                        {
                                            _state_dtt !== "error"
                                                ? <SpinnerCircle />
                                                : <div>error to load Drawing Tracces info</div>
                                        }
                                        <GetGeneticElements
                                            leftEndPosition={_posLeft}
                                            rightEndPosition={_posRight}
                                            resoultsData={(data) => { set_data_dtt(data) }}
                                            status={(state) => set_state_dtt(state)}
                                        />
                                    </div>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: "center" }}>
                        <button className="iconButton"
                                onClick={() => {
                                    set_data_dtt(undefined)
                                    set_expand(!_expand)
                                    if(!_expand){
                                        set_posLeft(_data?.leftEndPosition-500)
                                        set_posRight(_data?.rightEndPosition)
                                    }else{
                                        set_data(undefined)
                                    }
                                }}
                            >
                               {
                                   !_expand
                                   ? <i className='bx bx-expand' ></i>
                                   :<i class='bx bx-exit-fullscreen' ></i>
                               }
                            </button>
                            <button className="iconButton"
                                onClick={() => {
                                    set_data_dtt(undefined)
                                    set_data(undefined)
                                }}
                            >
                                <i className='bx bx-reset' ></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }

    return (
        <div>
            {
                _state !== "error"
                    ? <SpinnerCircle />
                    : <div>error to load Drawing Gene Information</div>
            }
            <GetGeneInfo id_gene={id}
                resoultsData={(data) => {
                    set_data(data)
                    let pleft = data?.leftEndPosition
                    set_posRight(data?.rightEndPosition + 2000)
                    if (pleft < 1000) {
                        set_posLeft(0)
                    } else {
                        set_posLeft(pleft - 1000)
                    }
                }}
                status={(state) => set_state(state)}
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