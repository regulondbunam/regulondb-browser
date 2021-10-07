import React, { useState, useEffect } from "react";
import { SpinnerCircle } from "../ui-components/ui_components";
import GetGeneticElements from "./webServices/getGeneticElements";
import DrawingTracesTool from "./drawingTracesTool/drawing_traces_tool";
import OperonContext from "./context/operon";
import GeneContext from "./context/gene";


const DttTool = ({
    id,
    context = "DNA",
    leftEndPosition,
    rightEndPosition,
    custom_data_dtt
}) => {

    const [_expand, set_expand] = useState(false)
    const [_data_dtt, set_data_dtt] = useState()
    const [_state_dtt, set_state_dtt] = useState()
    const [_posLeft, set_posLeft] = useState(leftEndPosition)
    const [_posRight, set_posRight] = useState(rightEndPosition)

    useEffect(() => {
        let drawPlace = document.getElementById(`divCanvas_${context}Context${id}`)
        if (drawPlace) {
            let dnaFeatures_data = null
            switch (context.toLowerCase()) {
                case "operon":
                    dnaFeatures_data = OperonContext(leftEndPosition, rightEndPosition, _data_dtt)
                    break;
                case "gene":
                    dnaFeatures_data = GeneContext(id,_data_dtt)
                    break;
                case "tu":
                    if (custom_data_dtt) {
                        dnaFeatures_data = custom_data_dtt
                    }
                    break
                default:
                    break;
            }
            //console.log(dnaFeatures_data)
            if (dnaFeatures_data) {
                DrawingTracesTool({
                    idDrawPlace: `divCanvas_${context}Context${id}`,
                    idCanvas: `${context}_Canva${id}`,
                    dnaFeatures_data: dnaFeatures_data,
                    auto_adjust: true,
                    covered: true,
                    covered_LeftPosition: _posLeft,
                    covered_RightPosition: _posRight
                })
                drawPlace.scrollTo(0, 250)
                Resizer(drawPlace)
            } else {
                console.error("dtt, no valid context")
            }

        }
    }, [id, context, _data_dtt, _posRight, _posLeft, leftEndPosition, rightEndPosition, custom_data_dtt])


    if (custom_data_dtt) {
        return (
            <div style={{ overflow: "auto", height: "200px", resize: "vertical" }} id={`divCanvas_${context}Context${id}`} />
        )
    }

    if (_posLeft && _posRight) {
        let move = parseInt(`${(_posRight - _posLeft) * 0.15}`, 10)
        let zoom = parseInt(`${(_posRight - _posLeft) * 0.25}`, 10)
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
                        <td >
                            {
                                _data_dtt
                                    ? <div style={{ overflow: "auto", height: "200px", resize: "vertical" }} id={`divCanvas_${context}Context${id}`} />
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
                            <div id="resizer_div" style={{ backgroundColor: "#cadce7", height: "5px", width: "100%" }} ></div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: "center" }}>
                            {
                                context === "gene"
                                    ? <button className="iconButton"
                                        onClick={() => {
                                            set_data_dtt(undefined)
                                            set_expand(!_expand)
                                            if (!_expand) {
                                                set_posLeft(leftEndPosition - 500)
                                                set_posRight(rightEndPosition)
                                            } else {
                                                set_posLeft(leftEndPosition)
                                                set_posRight(rightEndPosition)
                                            }
                                        }}
                                    >
                                        {
                                            !_expand
                                                ? <i className='bx bx-expand' ></i>
                                                : <i className='bx bx-exit-fullscreen' ></i>
                                        }
                                    </button>
                                    : null
                            }
                            <button className="iconButton"
                                onClick={() => {
                                        set_posLeft(leftEndPosition)
                                        set_posRight(rightEndPosition)
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
    return <></>

};

export default DttTool;

function Resizer(drawPlace) {
    let resizer = document.getElementById("resizer_div")
    if (resizer) {
        resizer.style.cursor = 'ns-resize';
        resizer.addEventListener('mousedown', initResize, false);

        function initResize(e) {
            window.addEventListener('mousemove', Resize, false);
            window.addEventListener('mouseup', stopResize, false);
        }
        function Resize(e) {
            drawPlace.style.height = (e.clientY - drawPlace.offsetTop) + 'px';
        }
        function stopResize(e) {
            window.removeEventListener('mousemove', Resize, false);
            window.removeEventListener('mouseup', stopResize, false);
        }
    }
}

