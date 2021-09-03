import React from 'react'
import { Link } from "react-router-dom";
import { GeneOntology } from '../terms/geneOntology';
import { Multifun } from '../terms/multifun';
import { Modal } from "../../../../components/ui-components/ui_components"

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
            <table style={{ marginLeft: "5%" }}>
                <thead>
                    <tr style={thStyle}>
                        <th>Name</th>
                        <th>Function</th>
                        <th>Multifun</th>
                        <th>Gene Ontology</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        genes.map((gene) => {
                            //console.log(gene)
                            return (
                                <tr key={`regulated_gene_${gene?.id}`} className={"trShadow"} >
                                    <td>
                                        <Link to={`/gene/${gene?.id}`}>{gene?.name}</Link>
                                    </td>
                                    <td>
                                        {gene?.function}
                                    </td>
                                    <td>{MUinfo(gene)}</td>
                                    <td>{GOinfo(gene)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>


            </table>

        </div>
    )
}

function GOinfo(gene) {
    if(!gene?.terms?.geneOntology){
        return null
    }
    return(
        <Modal title={"display GO terms ..."} component={
            <div>
                <h3>{gene?.name}</h3>
                <p>Gene Ontology</p>
                {GeneOntology(gene?.terms?.geneOntology,false)}
            </div>
        }/>
    )
}

function MUinfo(gene) {
    if(!gene?.terms?.multifun){
        return null
    }
    let title

    try {
        title = gene?.terms?.multifun.map((mu, idx)=>{
            if(idx > 1){
                return null
            }
            return mu?.name
        }).join(", ")
    } catch (error) {
        
    }

    return(
        <Modal title={title?title:"..."} component={
            <div>
                <h3>{gene?.name}</h3>
                <p>Multifun</p>
                {Multifun(gene?.terms?.multifun, false)}
            </div>
        }/>
    )
}
