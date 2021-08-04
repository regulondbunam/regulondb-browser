import React from 'react'
import { Link } from "react-router-dom";

const thStyle = {
    fontWeight: "bold",
    borderBottom: "1px solid #72A7C7",
    textAlign: "inherit",
}


export function Genes({ genes = [] }) {
    console.log(genes)
    if (!genes || genes.length === 0) {
        return null
    }
    return (
        <div>
            <h3>Genes</h3>
            {
                genes.map((gene) => {
                    return (
                        <div style={{ marginLeft: "5%" }} key={`regulated_gene_${gene?.id}`}>
                            <table>
                                <thead>
                                    <tr style={thStyle}>
                                        <th style={{width: "auto"}} >
                                            <Link to={`/gene/${gene?.id}`}><h4 style={{ margin: "2px 0px 2px 0px" }}>{gene?.name}</h4></Link>
                                        </th>
                                        <th style={{width: "100%"}}>
                                            {gene?.function}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{textAlign: "center"}} colSpan="2"> <button className="aBase"> Show Terms ... </button> </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Terms
                                multifun={gene?.terms?.multifun}
                                ontology={gene?.terms?.geneOntology}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}

function Terms({ multifun = [], ontology = [] }) {
    return (
        <table>
        </table>
    )
}