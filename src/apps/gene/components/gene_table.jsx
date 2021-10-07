import React from 'react'
import { Link } from 'react-router-dom'
const styleTh = {
    fontWeight: "bold",
    borderBottom: "1px solid rgb(114, 167, 199)",
    textAlign: "inherit",
}

export default function Table(genes = []) {

    if (genes.length === 0 || !genes) {
        return null
    }

    return (
        <table>
            <tbody>
                {
                    genes.map((gene)=>{
                        let products = ""
                        try {
                            products = gene?.products.map(pro=>{
                                return pro?.name
                            }).join(", ")
                        } catch (error) {
                            
                        }
                        return(
                            <tr className="trClickable" key={`table_gene_${gene?._id}`}  >
                                <td>
                                    <Link to={`/gene/${gene._id}`} >
                                       <p dangerouslySetInnerHTML={{__html: `
                                       ${gene?.gene?.name}, ${gene?.gene?.synonyms}, ${products}
                                       `}}></p> 
                                    </Link>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}
// onClick={()=>{history.push()}} 