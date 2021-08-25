import React from 'react'
import { Link } from 'react-router-dom'
import { ParagraphCitations } from '../../../../../components/citations/citations';
import { CitationCONTEXT } from '../../../../../components/citations/citations_provider';

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
                    <td colSpan="5">
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
                            <tr className="trShadow" >
                                <td >
                                    {`${name}...`}
                                </td>
                                {
                                    Genes(ri?.regulatedGenes)
                                }
                                <td>
                                    {distanceTo(ri?.distanceToFirstGene)}
                                </td>
                                <td>
                                    {distanceTo(ri?.distanceToPromoter)}
                                </td>
                                <td>
                                    {distanceTo(ri?.function)}
                                </td>
                                <td>
                                    {
                                        distanceTo(ri?.regulatoryBindingSites?.leftEndPosition)
                                    }
                                </td>
                                <td>
                                    {
                                        distanceTo(ri?.regulatoryBindingSites?.rightEndPosition)
                                    }
                                </td>
                                <td>
                                    {
                                        distanceTo(ri?.regulatoryBindingSites?.sequence)
                                    }
                                </td>
                                <td>
                                            <ParagraphCitations 
                                                CitationCONTEXT={CitationCONTEXT}
                                                citations={ri?.citations} 
                                            />
                                </td>
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

function distanceTo(distance){
    if(!distance){
        return ""
    }
    return distance
}