import React, { useState } from 'react'
import { DataTUterminators } from '../../webServices/operon_ws_TU'

export const TUTerminators = ({ idTU }) => {
    // eslint-disable-next-line no-unused-vars
    const [_data, set_data] = useState();
    const [_state, set_state] = useState();
    //let loading = false;
    //console.log(_data)
    switch (_state) {
        case "loading":
            //loading = true
            break;
        case "error":
            return <>error</>
        case "done":
            //console.log(_data)
            return <Terminators idTU={idTU} data={termiExample} />
        default:
            break
    }
    if (idTU) {
        return (
            <div>
                loading...
                <DataTUterminators id={idTU}
                    resoultsData={(data) => { set_data(data) }}
                    status={(state) => { set_state(state) }}
                />
            </div>
        )
    }
    return <>no id</>
}

function Terminators({ idTU, data }) {
    const tu = data.find(element => element.id === "idTest");
    //console.log(tu)
    return (
        <>
        {
            tu.terminators.map((terminator)=>{
                return(
                    <div key={`terminator_${terminator._id}`}>
                        <h3>{terminator?.transcriptionTerminationSite?.type}</h3>
                        <table style={{ tableLayout: "fixed", width: "auto" }}>
                            <tbody>
                                <tr >
                                    <td style={{ fontWeight: "bold" }} >LeftPos</td><td>{terminator?.transcriptionTerminationSite?.leftEndPosition}</td>
                                    <td style={{ fontWeight: "bold" }} >RightPos</td><td>{terminator?.transcriptionTerminationSite?.rightEndPosition}</td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: "bold" }}>sequence</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td colSpan="4" >{terminator?.sequence}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            })
        }
        </>
    )
}

const termiExample = [
    {
        "id": "idTest",
        "terminators": [
            {
                "_id": "idteminator01",
                "sequence": "ttcctgacttAAGCGGCGCTGGTTATCCATcggagccatc",
                "transcriptionTerminationSite": {
                    "type": "rho-independent",
                    "leftEndPosition": 1000,
                    "rightEndPosition": 1800
                }
            },
            {
                "_id": "idteminator02",
                "sequence": "gcatcagagaATTGACGGAGAAAAAAGCCCATGCAGAGATGGGCTACAGATAGCTGACAAACTTCacgttggaga",
                "transcriptionTerminationSite": {
                    "type": "rho-independent",
                    "leftEndPosition": 1400,
                    "rightEndPosition": 1600
                }
            }
        ]
    }
]