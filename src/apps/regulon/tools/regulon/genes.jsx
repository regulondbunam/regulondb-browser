import React from 'react'
import { Link } from "react-router-dom";

const thStyle = {
    fontWeight: "bold",
    borderBottom: "1px solid #72A7C7",
    textAlign: "inherit",
}


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
                    return (
                        <div style={{ marginLeft: "5%" }} key={`regulated_gene_${gene?.id}`}>
                            <table>
                                <thead>
                                    <tr style={thStyle}>
                                        <th style={{ width: "auto" }} >
                                            <Link to={`/gene/${gene?.id}`}><h4 style={{ margin: "2px 0px 2px 0px" }}>{gene?.name}</h4></Link>
                                        </th>
                                        <th style={{ width: "100%" }}>
                                            {gene?.function}
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Terms
                                                multifun={gene?.terms?.multifun}
                                                ontology={gene?.terms?.geneOntology}
                                            />
                                        </td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    )
                })
            }
        </div>
    )
}

function Terms({ multifun = [], ontology = {} }) {
    if ((!multifun || multifun.length === 0) && (!ontology)) {
        return null
    }
    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        {Multifun(multifun)}
                    </td>
                </tr>
                <tr>
                    <td>
                        {Ontology(ontology)}
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

function Multifun(multifun = []) {
    if (!multifun || multifun.length === 0) {
        return null
    }
    return (
        <table>
            <thead>
                <tr style={thStyle} >
                    <th>Multifun</th>
                </tr>
            </thead>
            <tbody>
                {
                    multifun.map((fun) => {
                        let genes = ""
                        try {
                            genes = fun.genes.map(gen => {
                                return gen?.gene_name
                            }).join(', ')
                        } catch (error) {

                        }

                        return (
                            <tr key={`multifunT_${fun.id}`}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>{fun.name}</td>
                                            <td>{genes}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

function Ontology(ontology) {
    if (!ontology) {
        return null
    }
    return (
        <table>
            <tbody>
                <tr><td>cellularComponent</td></tr>
                {
                    ontology?.cellularComponent
                        ? GeneOntologyItem(ontology?.cellularComponent)
                        : null
                }
                <tr><td>molecularFunction</td></tr>
                {
                    ontology?.molecularFunction
                        ? GeneOntologyItem(ontology?.molecularFunction)
                        : null
                }
                <tr><td>biologicalProcess</td></tr>
                {
                    ontology?.biologicalProcess
                        ? GeneOntologyItem(ontology?.biologicalProcess)
                        : null
                }
            </tbody>
        </table>
    )
}

function GeneOntologyItem(data) {
    return (
        <tr>
            <table>
                <tbody>
                    {
                        data.map(fun => {
                            let genes = ""
                            try {
                                genes = fun.genes.map(gen => {
                                    return gen?.gene_name
                                }).join(', ')
                            } catch (error) {
                            }
                            return (
                                <tr key={`multifunT_${fun.term_id}`}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>{fun.name}</td>
                                                <td>{genes}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </tr>
    )
}