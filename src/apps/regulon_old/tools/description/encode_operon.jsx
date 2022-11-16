import React from 'react'
import { Link } from "react-router-dom";


const thStyle = {
    fontWeight: "bold",
    borderBottom: "1px solid #72A7C7",
    textAlign: "inherit",
}

export default function EncodeOperon({ encodedFrom_gene }) {
    let operones = encodedFrom_gene?.operon
    if (!operones) {
        return null
    }
    if (operones.length === 0) {
        return null
    }
    return (
        <div>
            <h3>Encoded Operon</h3>
            <table style={{ marginLeft: "5%"}} >
                <thead>
                    <tr>
                        <th style={thStyle} >Name</th>
                        <th style={thStyle} >TU Encoding Regulator</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        operones.map(operon => {
                            return (
                                <tr key={`enco_operon_${operon?.operon_id}`} >
                                    <td style={{verticalAlign: "middle"}} >
                                        <Link to={`/operon/${operon?.operon_id}`}>{operon.name}</Link>
                                    </td>
                                    <td>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th style={thStyle} >Transcription Unit</th>
                                                    <th style={thStyle} >Promoter</th>
                                                </tr>
                                            </thead>
                                                {
                                                    Tus(operon?.tusEncodingRegulator, operon?.operon_id)
                                                }
                                        </table>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

function Tus(tus, id) {
    if (!tus) {
        return null
    }
    if (tus.length === 0) {
        return null
    }
    return(
        <tbody>
            {tus.map(tu=>{
                return(
                    <tr key={`tu_encode-${id}-${tu.promoterName}`}>
                        <td>{tu.transcriptionUnitName}</td>
                        <td>{tu.promoterName}</td>
                    </tr>
                )
            })}
        </tbody>
    )
}