import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { GeneOntology } from '../terms/geneOntology';
import { Multifun } from '../terms/multifun';

export function Genes({ genes = [] }) {
    //console.log(genes)
    if (!genes || genes.length === 0) {
        return null
    }
    return (
        <div>
            <h3>Genes</h3>
            {
                genes.map((gene) => {
                    console.log(gene)
                    return <Gene gene={gene} />
                })
            }
        </div>
    )
}

function Gene({ gene }) {

    const [_displayGO, set_displayGO] = useState(false)
    const [_displayMU, set_displayMu] = useState(false)

    return (
        <div style={{ marginLeft: "5%" }} key={`regulated_gene_${gene?.id}`}>
            <Link to={`/gene/${gene?.id}`}><h3 style={{ margin: "3% 0px 3% 0px" }}>{gene?.name}</h3></Link>
            <p>
                {`Gene Function: ${gene?.function}`}
            </p>
            <div>
                <table style={{ margin: "1% 0% 0px 5%" }}>
                    <tbody>
                        {
                            gene?.terms?.geneOntology
                                ? <tr>
                                    <td>
                                        <h4 style={{ margin: "0" }} >Gene Ontology</h4>
                                    </td>
                                </tr>
                                : null
                        }
                        <tr>
                            <td>
                                {
                                    _displayGO
                                        ? <div style={{ margin: "0% 0% 0px 1%" }} >{GeneOntology(gene?.terms?.geneOntology, false)}</div>
                                        : null
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={() => {
                                    set_displayGO(!_displayGO)
                                }} className="aBase">
                                    {
                                        _displayGO
                                            ? "Hide GO Info"
                                            : "Show GO Info"
                                    }
                                </button>
                            </td>
                        </tr>
                        {
                            gene?.terms?.multifun
                                ? <tr>
                                    <td>
                                        <h4 style={{ margin: "0" }} >Multifun</h4>
                                    </td>
                                </tr>
                                : null
                        }
                        <tr>
                            <td>
                                {
                                    _displayMU
                                        ? <div style={{ margin: "0% 0% 0px 1%" }} >{Multifun(gene?.terms?.multifun, false)}</div>
                                        : null
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={() => {
                                    set_displayMu(!_displayMU)
                                }} className="aBase">
                                    {
                                        _displayMU
                                            ? "Hide Multifun Info"
                                            : "Show Multifun Info"
                                    }
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )

}