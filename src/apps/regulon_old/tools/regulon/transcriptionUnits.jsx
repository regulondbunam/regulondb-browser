import React from 'react'
import { Link } from 'react-router-dom'

const thStyle = {
    fontWeight: "bold",
    borderBottom: "1px solid #72A7C7",
    textAlign: "inherit",
}

export function TranscriptionUnits({ transcriptionUnits }) {
    if (!transcriptionUnits || transcriptionUnits.length === 0) {
        return null
    }
    return (
        <div>
            <h3>Transcription Units</h3>
            <table style={{ marginLeft: "5%" }} >
                <thead>
                    <tr style={thStyle}>
                        <th>Name</th>
                        <th>Function</th>
                        <th>First Gene</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transcriptionUnits.map((tu) => {
                            return (
                                <tr key={`tu_${tu?.id}`} className={"trShadow"} >
                                    <td style={{ width: "100%" }} >
                                        <Link to={`/tu/${tu?.id}`}><h4 style={{ margin: "2px 0px 2px 0px" }}>{tu?.name}</h4></Link>
                                    </td>
                                    <td style={{ width: "auto" }}>
                                        {tu?.function}
                                    </td>
                                    <td>
                                        <Link to={`/gene/${tu?.firstGene?.id}`}><h4 style={{ margin: "2px 0px 2px 0px" }}>{tu?.firstGene?.name}</h4></Link>
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
