import React from 'react'
import { Link } from 'react-router-dom'

export default function Genes({rGenes = []}) {
    if (!rGenes || rGenes.length === 0) {
        return null
    }
    return (
        <table style={{marginLeft: "5%"}} >
            <thead>
                <tr className=".tableContent-th-subtitle">
                    <th>
                        Regulated Genes
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        {
                            rGenes.map((gene)=>{
                                return <Link style={{margin: '1%'}} to={`/gene/${gene?.id}`} >{gene?.name}</Link>
                            })
                        }
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
