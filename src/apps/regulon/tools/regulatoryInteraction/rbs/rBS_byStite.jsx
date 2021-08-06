import React from 'react'
import { MarkSequence } from './bs_compnents/mkSequence'
import { ParagraphCitations } from '../../../../../components/citations/citations'
import { CitationCONTEXT } from '../../../../../components/citations/citations_provider'
export function RBSbyStite({ rbs = {
    id: "",
    function: "",
    absolutePosition: "",
    leftEndPosition: "",
    rightEndPosition: "",
    sequence: "",
    strand: "",
} }) {
    //console.log(data)
    //    const sites = orderRIS(rbs)
    return (
        <table>
            <thead>
                <tr style={tbTitle}>
                    <th  >Function</th>
                    <th  >Strand</th>
                    <th  >Absolute Position</th>
                    <th  >LeftPos</th>
                    <th  >RightPos</th>
                    <th  >Sequence</th>
                    <th  >Citations</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        {rbs?.function}
                    </td>
                    <td>
                        {rbs?.strand}
                    </td>
                    <td>
                        {rbs?.absolutePosition}
                    </td><td>
                        {rbs?.leftEndPosition}
                    </td>
                    <td>
                        {rbs?.rightEndPosition}
                    </td>
                    <td>
                        {MarkSequence(rbs?.id,rbs?.sequence)}
                    </td>
                    <td>
                    <ParagraphCitations 
                                                CitationCONTEXT={CitationCONTEXT}
                                                citations={rbs?.citations} 
                                            />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

/*
function orderRIS(rbs) {
    //console.log(`rbs`, rbs)
    let sites = []
    rbs.map(bs => {
        bs?.regulatoryInteractions.map(ri => {
            const rs = ri?.regulatorySite
            let site = []
            site["_id"] = rs?._id
            site.push(bs?.regulator?.name)
            site.push(ri?.function)
            site.push(" ")
            site.push(ri?.centerPosition)
            site.push(rs?.absolutePosition)
            site.push(rs?.leftEndPosition)
            site.push(rs?.rightEndPosition)
            site.push(MarkSequence(`${rs?._id}-${ri?.function}`,rs?.sequence))
            site.push("---")
            sites.push(site)
            return null
        })

        return null
    })

    return sites
}
*/

const tbTitle = {
    fontWeight: "bold",
    borderBottom: "1px solid #72A7C7",
    textAlign: "inherit",
}