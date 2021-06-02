import React from 'react'
import {MarkSequence} from './bs_compnents/mkSequence'
//import AllCitations from '../../../../components/cits/Cits'

export const RBSbyStite = ({ data, type = "" }) => {
    switch (type) {
        case "genes":
           data = data.genes
           return rbsTable()
        case "promoter":
            return rbsTable(data.promoter, `Promoter: ${data.promoter.name}`)
        case "regulator":
            data = data.regulatorBindingSites
            break;
        default:
            return <>no type selected</>
    }
    return <></>

}

function rbsTable(data,name) {
    const rbs = data?.regulatorBindingSites
    console.log(data)
    const sites = orderRIS(rbs)
    return (
        <table>
            <thead>
                <tr>
                <th style={tbTitle} colSpan="9" >{name}</th>
                </tr>
                <tr>
                    <th style={tbTitle} colSpan="2" >Regulator</th>
                    <th></th>
                    <th style={tbTitle} colSpan="6" >Regulatory Interactions</th>
                </tr>
                <tr>
                    <th style={thStyle} >Name</th>
                    <th style={thStyle} >Function</th>
                    <th></th>
                    <th style={thStyle} >Center Position</th>
                    <th style={thStyle} >Absolute Position</th>
                    <th style={thStyle} >LeftPos</th>
                    <th style={thStyle} >RightPos</th>
                    <th style={thStyle} >Sequence</th>
                    <th style={thStyle} >Evidence and References</th>
                </tr>
            </thead>
            <tbody>
                {
                    sites.map((site, index) => {
                        return (
                            <tr key={`tr-bs-${index}-${site[7]}<${index}`} >
                                {site.map((dt, i) => {
                                    return <td key={`td-bs-<${index}-${i}`} >{dt}</td>
                                })}

                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

function orderRIS(rbs) {
    let sites = []
    rbs.map(bs => {
        bs?.regulatoryInteractions.map(ri => {
            const rs = ri?.regulatorySite
            //console.log(ri)
            let site = []
            site.push(bs?.regulator?.name)
            site.push(bs?.regulator?.function)
            site.push(" ")
            site.push(ri?.centerPosition)
            site.push(rs?.absolutePosition)
            site.push(rs?.leftEndPosition)
            site.push(rs?.rightEndPosition)
            site.push(MarkSequence(rs?.sequence))
            site.push("---")
            sites.push(site)
            return null
        })
        
        return null
    })

    return sites
}



const thStyle = { fontWeight: "bold" }

const tbTitle = {
    fontWeight: "bold",
    borderBottom: "1px solid #72A7C7",
    textAlign: "inherit",
}