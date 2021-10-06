import React from 'react'
import MarkSequence  from './bs_compnents/mkSequence'
//import AllCitations from '../../../../components/cits/Cits'

export function RBSbyStite(data_tu, id_tu) {
    const PROMOTER = data_tu?.promoter
    const GENES = data_tu?.genes
    return (
        <div>
            {
                RBSs(PROMOTER, id_tu)
            }
            {
                data_tu?.genes
                    ? GENES.map((gene,indx) => {
                        return <div key={`rbss_${gene.id}_${indx}`}>
                            {
                                RBSs(gene, id_tu)
                            }
                        </div>
                    })
                    : null
            }
        </div>
    )
}

function RBSs(element, id_tu) {
    const rbs = element?.regulatorBindingSites
    if (rbs.length > 0) {
        const sites = orderRIS(rbs)
        return (
            <table key={`table-rbs-${id_tu}-${element.id}`}>
                <thead>
                    <tr>
                        <th style={tbTitle} colSpan="9" >{""}</th>
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
                                <tr key={`tr-bs-${index}-${site["_id"]}`} >
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
}

function orderRIS(rbs) {
    //console.log(`rbs`, rbs)
    let sites = []
    rbs.map(bs => {
        bs?.regulatoryInteractions.map((ri,indx)=> {
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
            site.push(<MarkSequence id={`${rs?._id}-${ri?._id}sumarryInfo`} data_sequence={{
                sequence: rs?.sequence, posL: rs?.leftEndPosition, posR: rs?.rightEndPosition
            }} />)
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