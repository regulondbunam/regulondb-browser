import React from 'react'
import { useHistory } from 'react-router-dom'

const styleTh = {
    fontWeight: "bold",
    borderBottom: "1px solid rgb(114, 167, 199)",
    textAlign: "inherit",
}

export default function Table(genes = []) {

    const history = useHistory()

    if (genes.length === 0 || !genes) {
        return null
    }

    return (
        <table>
            <thead>
                <tr style={styleTh} >  
                    <th>
                        Name
                    </th>
                    <th>
                        Synonyms
                    </th>
                    <th>
                        Products
                    </th>
                </tr>
            </thead>
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
                            <tr className="trClickable" key={`table_gene_${gene?._id}`} onClick={()=>{history.push(`/gene/${gene._id}`)}}  >
                                <td dangerouslySetInnerHTML={{__html: gene?.gene?.name}} />
                                <td dangerouslySetInnerHTML={{__html: gene?.gene?.synonyms}}/>
                                <td dangerouslySetInnerHTML={{__html: products}}/>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}
