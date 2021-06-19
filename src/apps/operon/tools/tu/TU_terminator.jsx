import React, { useState } from 'react'
import { GetTerminators } from '../../webServices/tu_ws'
import {MarkSequenceTerminator} from './terminator_components/mkSequence'

export const TUTerminators = ({ id_tu, id_operon }) => {
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
            return <Terminators id_tu={id_tu} data={_data} />
        default:
            break
    }
    if (id_tu) {
        return (
            <div>
                loading...
                <GetTerminators id_operon={id_operon}
                    resoultsData={(data) => { set_data(data) }}
                    status={(state) => { set_state(state) }}
                />
            </div>
        )
    }
    return <>no id</>
}

function Terminators({ id_tu, data }) {
    try {
        //console.log(data)
        data = data.transcriptionUnits
        const tu = data.find(element => element.id === id_tu);
        return (
            <div style={{ marginLeft: "5%" }}>
                {
                    tu.terminators.map((terminator) => {
                        //console.log(terminator)
                        if (terminator) {
                            return (
                                <div key={`terminator_${terminator._id}`}>
                                    <h3>{terminator?.transcriptionTerminationSite?.type}</h3>
                                    <table>
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
                                                <td colSpan="4" >
                                                    <MarkSequenceTerminator 
                                                    sequenceInfo={{
                                                        sequence: terminator?.sequence,
                                                        posL: terminator?.transcriptionTerminationSite?.leftEndPosition,
                                                        posR: terminator?.transcriptionTerminationSite?.rightEndPosition
                                                        }}
                                                    id={terminator._id}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )
                        }
                        return null
                    })
                }
            </div>
        )
    } catch (error) {
        console.error(error)
    }
    return <>error to load terminators</>

}
/**
 * sequenceInfo: {
                            sequence: rs?.sequence,
                            posL: rs?.leftEndPosition,
                            posR: rs?.rightEndPosition
                        },
 */

// eslint-disable-next-line no-unused-vars
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