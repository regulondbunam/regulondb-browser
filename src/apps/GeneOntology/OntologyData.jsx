import React from "react";
import { DataVerifier } from "../../components/ui-components";
import { Link } from "react-router-dom";

export default function OntologyData({
  _id,
  description,
  genes,
  name,
  ontologyId,
}) {
  return (
    <div style={{margin: "0 20px 0 0"}}>
      <p style={{fontSize: "10px"}}>{_id}</p>
      <p><b>Ontology id</b></p>
      <p>{ontologyId}</p>
      <h2>{name}</h2>
      {DataVerifier.isValidString(description) && (
        <>
        <p><b>Description:</b></p>
        <div><p dangerouslySetInnerHTML={{__html: description}} /></div>
        </>
      )}
      {DataVerifier.isValidArray(genes) && (
        <>
        <p><b>Genes: </b></p>
        <table>
            <thead>
                <tr>
                    <th>Name - Product</th>
                </tr>
            </thead>
            <tbody>
            {genes.map((gene)=>{
            return (
                <tr key={"geneGO_"+_id+"_"+gene._id} >
                    <td><Link to={"/gene/"+gene._id} ><p dangerouslySetInnerHTML={{__html: `${gene.name} - ${gene.productName}`}} /></Link></td>
                </tr>
            )
        })}
            </tbody>
        </table>
        </>
      )}
    </div>
  );
}
