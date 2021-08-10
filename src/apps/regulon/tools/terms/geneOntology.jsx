import React from 'react'
import { Link } from 'react-router-dom'

const thStyle = {
    fontWeight: "bold",
    borderBottom: "1px solid #72A7C7",
    textAlign: "inherit",
}
const trStyle = {
    borderBottom: "1px solid #66666666",
    textAlign: "inherit",
}

export function GeneOntology(geneOntology, showGenes = true) {
    console.log(geneOntology)
    if(!geneOntology){
        return null
    }
    return (
        <div>
            {
                CellularComponent(geneOntology?.cellularComponent, showGenes)
            }
            {
                MolecularFunction(geneOntology?.molecularFunction, showGenes)
            }
            {
                BiologicalProcess(geneOntology?.biologicalProcess, showGenes)
            }
        </div>
    )
}

function CellularComponent(cc, showGenes) {
    //console.log(cc)
    if (!cc || cc.length === 0) {
        return null
    }
    return (
        <table style={{ margin: "1% 0% 0px 5%" }}>
            <thead>
                <tr style={thStyle} >
                    <th><h4 style={{ margin: "0" }} >Cellular Component</h4></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <table>
                            <thead>
                                <tr style={thStyle}>
                                    <th>Name</th>
                                   {
                                       showGenes
                                       ?<th>Genes</th>
                                       :null
                                   }
                                </tr>
                            </thead>
                            {
                                GeneOntologyItem(cc)
                            }
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

function MolecularFunction(cc, showGenes) {
    if (!cc || cc.length === 0) {
        return null
    }
    return (
        <table style={{ margin: "1% 0% 0px 5%" }}>
            <thead>
                <tr style={thStyle} >
                    <th><h4 style={{ margin: "0" }} >Molecular Function</h4></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <table>
                            <thead>
                                <tr style={thStyle}>
                                    <th>Name</th>
                                   {
                                       showGenes
                                       ?<th>Genes</th>
                                       :null
                                   }
                                </tr>
                            </thead>
                            {
                                GeneOntologyItem(cc)
                            }
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

function BiologicalProcess(cc, showGenes) {
    if (!cc || cc.length === 0) {
        return null
    }
    return (
        <table style={{ margin: "1% 0% 0px 5%" }}>
            <thead>
                <tr style={thStyle} >
                    <th><h4 style={{ margin: "0" }} >Biological Process</h4></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <table>
                            <thead>
                                <tr style={thStyle}>
                                    <th>Name</th>
                                   {
                                       showGenes
                                       ?<th>Genes</th>
                                       :null
                                   }
                                </tr>
                            </thead>
                            {
                                GeneOntologyItem(cc)
                            }
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

function GeneOntologyItem(genes, showGenes) {
    //console.log(genes)
    if (!genes || genes.length === 0) {
        return null
    }
    return(
        <tbody>
            {
                genes.map((fun) => {
                    return (
                        <tr className={"trShadow"} style={trStyle} key={`ccT_${fun.term_id}`}>
                            <td>{fun.name}</td>
                            <td>
                                {
                                    Genes(fun.genes)
                                }
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    )
}

function Genes(genes) {
    try {
        return (
            <div>
                {
                    genes.map(gen => {
                        return (
                            <div key={`geneROI_${gen?.gene_id}`}>
                                <Link to={`/gene/${gen?.gene_id}`}>{gen?.gene_name}</Link>
                            </div>
                        )
                    })
                }
            </div>
        )
    } catch (error) {
        console.log("geneOntology:", error)
        return null
    }
}