import React from 'react'
import { MarkSequence } from './bs_compnents/mkSequence'

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
                <tr>
                    <th style={tbTitle} colSpan="2" >Regulator</th>
                    <th></th>
                    <th style={tbTitle} colSpan="6" >Regulatory Interactions</th>
                </tr>
                <tr>
                    <th style={thStyle} >Function</th>
                    <th style={thStyle} >Strand</th>
                    <th style={thStyle} >Absolute Position</th>
                    <th style={thStyle} >LeftPos</th>
                    <th style={thStyle} >RightPos</th>
                    <th style={thStyle} >Sequence</th>
                    <th style={thStyle} >Citations</th>
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
                        evi
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


const thStyle = { fontWeight: "bold" }

const tbTitle = {
    fontWeight: "bold",
    borderBottom: "1px solid #72A7C7",
    textAlign: "inherit",
}