import React from 'react'
import { Link } from 'react-router-dom'

const thStyle = {
    fontWeight: "bold",
    borderBottom: "1px solid #72A7C7",
    textAlign: "inherit",
}

export function SigmaFactors({ sigmaFactors }) {
    if (!sigmaFactors || sigmaFactors.length === 0) {
        return null
    }
    return (
        <div>
            <h3>Sigma Factors</h3>
            <table style={{ marginLeft: "5%" }} >
                <thead>
                    <tr style={thStyle}>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sigmaFactors.map((sigma) => {
                            //console.log(sigma)
                            return (
                                <tr key={`sigma_${sigma?.id}-${sigma?.firstGene?.id}`} className={"trShadow"} >
                                    <td style={{ width: "100%" }} >
                                        <Link to={`/sigma/${sigma?.id}`}><h4 style={{ margin: "2px 0px 2px 0px" }}>{sigma?.name}</h4></Link>
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
