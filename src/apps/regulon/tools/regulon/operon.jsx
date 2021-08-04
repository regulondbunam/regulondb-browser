import React from 'react'
import { Link } from 'react-router-dom'

const thStyle = {
    fontWeight: "bold",
    borderBottom: "1px solid #72A7C7",
    textAlign: "inherit",
}

export function Operons({ operons }) {
    if (!operons || operons.length === 0) {
        return null
    }
    return (
        <div>
            <h3>Operons</h3>
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
                        operons.map((operon) => {
                            return (
                                <tr key={`operon_${operon?.id}`} className={"trShadow"} >
                                    <td style={{ width: "auto" }} >
                                        <Link to={`/operon/${operon?.id}`}><h4 style={{ margin: "2px 0px 2px 0px" }}>{operon?.name}</h4></Link>
                                    </td>
                                    <td style={{ width: "100%" }}>
                                        {operon?.function}
                                    </td>
                                    <td>
                                        <Link to={`/gene/${operon?.firstGene?.id}`}><h4 style={{ margin: "2px 0px 2px 0px" }}>{operon?.firstGene?.name}</h4></Link>
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
