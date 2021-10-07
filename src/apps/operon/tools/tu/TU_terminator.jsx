import React from 'react'
import { MarkSequenceTerminator } from './terminator_components/mkSequence'

export const TUTerminators = ({ id_tu, data_tu, conf }) => {
    try {
        //console.log(data_tu?.terminators)
        if (!data_tu?.terminators || data_tu?.terminators.length === 0) {
            return null
        }
        return (
            <div style={{padding: "0% 0% 0% 10%", marginRight: "10%"}} >
                <h2>{conf?.title}</h2>
                <div style={{ marginLeft: "5%" }} >
                    {
                        data_tu?.terminators.map((terminator) => {
                            //console.log(terminator)
                            if (terminator) {
                                return (
                                    <div key={`terminator_${terminator._id}`}
                                        onMouseEnter={() => {
                                            let gn = document.getElementById(`${terminator._id}#tu_Canva${id_tu}/s`)
                                            if (gn) {
                                                gn.setAttribute("stroke", "#00F");
                                                gn.setAttribute("stroke-width", "2");
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            let gn = document.getElementById(`${terminator._id}#tu_Canva${id_tu}/s`)
                                            if (gn) {
                                                gn.setAttribute("stroke", "");
                                                gn.setAttribute("stroke-width", "0");
                                            }
                                        }}
                                    >
                                        <h3>{terminator?.transcriptionTerminationSite?.type}</h3>
                                        <table className="table_auto" >
                                            <tbody>
                                                <tr >
                                                    <td style={{ fontWeight: "bold" }} >LeftPos</td><td>{terminator?.transcriptionTerminationSite?.leftEndPosition}</td>
                                                    <td style={{ fontWeight: "bold" }} >RightPos</td><td>{terminator?.transcriptionTerminationSite?.rightEndPosition}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td style={{ fontWeight: "bold" }}>sequence</td>
                                                </tr>
                                                <tr>
                                                    <td >
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
            </div>
        )
    } catch (error) {
        console.error(error)
    }
    return <>error to load terminators</>
}
