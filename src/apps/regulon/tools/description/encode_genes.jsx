import React from 'react'
import {Link} from "react-router-dom";
  

const thStyle = {
    fontWeight: "bold",
    borderBottom: "1px solid #72A7C7",
    textAlign: "inherit",
}

export default function EncodeGenes({encodedFrom_gene}) {
    let genes = encodedFrom_gene?.genes
    if (!genes) {
        return null
    }
    if(genes.length === 0){
        return null
    }
    return (
        <div>
            <h3>Encoded Genes</h3>
            <table style={{ marginLeft: "5%", tableLayout: "fixed", width: "auto", display: "inline-block" }} >
                <thead>
                    <tr>
                        <th style={thStyle} >Name</th>
                        <th style={thStyle} >length</th>
                        <th style={thStyle} >Position</th>
                    </tr>
                </thead>
                <tbody>
                   {
                       genes.map(gene=>{
                           return(
                               <tr key={`enco_gene_${gene?.gene_id}`} >
                                   <td><Link to={`/gene/${gene?.gene_id}`}>{gene.gene_name}</Link></td>
                                   <td>{gene.length}</td>
                                   <td>{gene.genomePosition}</td>
                               </tr>
                           )
                       })
                   }
                </tbody>
            </table>
        </div>
    )
}
