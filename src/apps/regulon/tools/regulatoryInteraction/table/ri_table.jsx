import React from 'react'
import { Link } from 'react-router-dom'

export default function Table({ data = [] }) {

    if (!data || data.length === 0) {
        return null
    }

    return (
        <table>
            <thead>
                <tr>
                    <td colSpan="2" >
                        Interaction Info
                    </td>
                    <td colSpan="2" >
                        Distance
                    </td>
                    <td colSpan="7">
                        Binding Site
                    </td>
                </tr>
                <tr className="thMain" style={{ position: "sticky", top: "0", backgroundColor: "#FFF" }} >
                    <th>
                        Name
                    </th>
                    <th>
                        Regulated Genes
                    </th>
                    <th>
                        To Promoter
                    </th>
                    <th>
                        To Gene
                    </th>

                    <th>
                        Function
                    </th>
                    <th>
                        Strand
                    </th>
                    <th>
                        Absolute Position
                    </th>
                    <th>
                        Left Position
                    </th>
                    <th>
                        Right Position
                    </th>
                    <th>
                        Sequence
                    </th>
                    <th>
                        Citations
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((ri) => {
                        console.log(ri)
                        let name = ri?.regulator.name
                        try {
                            name = name.slice(0,5)
                        } catch (error) {
                            
                        }
                        return (
                            <tr >
                                <td >
                                    {`${name}...`}
                                </td>
                                {
                                    Genes(ri?.regulatedGenes)
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

function Genes(genes) {
    try {
        return (
            <td>
                {
                    genes.map(gen => {
                        return (
                            <Link style={{ float: "left", marginRight: "1%" }} key={`geneROI_${gen?.id}`} to={`/gene/${gen?.id}`}>{gen?.name}</Link>
                        )
                    })
                }
            </td>
        )
    } catch (error) {
        console.log("ri table:", error)
        return null
    }
}