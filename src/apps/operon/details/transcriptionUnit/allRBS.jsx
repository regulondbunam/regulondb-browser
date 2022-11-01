import React from 'react';
import { Link } from 'react-router-dom';
import { MarkSequenceSimple } from "../../../../components/sequence"
import { ParagraphCitations,  } from "../../../../components/citations"


function AllRBS({tuId, regulatorBindingSitesGroups, allCitations}) {
    //const [_displayOption, set_displayOption] = useState("summary");

    
    return (
        <div>
            <div style={{overflow: "auto"}} >
            {regulatorBindingSitesGroups?.promoter && (
                <RbsSummary
                    regulatorBindingSites={regulatorBindingSitesGroups.promoter.regulatorBindingSites}
                    tuId={tuId}
                    title={"Linked to Promoter " + regulatorBindingSitesGroups.promoter.name}
                    allCitations={allCitations}
                />
            )}
            {regulatorBindingSitesGroups?.genes && (
                <div>
                    {
                        regulatorBindingSitesGroups.genes.map((gene) => {
                            let GLink = <Link to={"/gene/" + gene.id}>
                            <p className="p_accent" dangerouslySetInnerHTML={{__html: `Linked to Gene ${gene.name}`}} />
                          </Link>
                            return <RbsSummary key={"rbs_in_gene_"+gene.id}
                                regulatorBindingSites={gene.regulatorBindingSites}
                                tuId={tuId}
                                title={GLink}
                                allCitations={allCitations}
                            />
                        })
                    }
                </div>
            )}
            {regulatorBindingSitesGroups?.rbs && (
                <RbsSummary
                    regulatorBindingSites={regulatorBindingSitesGroups.rbs}
                    tuId={tuId}
                    title={"Other Regulatory Binding Sites"}
                    allCitations={allCitations}
                />
            )}
        </div>
        </div>
    );
}

export default AllRBS;

export function RbsSummary({ regulatorBindingSites = [], tuId, title = "", allCitations }) {

    if (regulatorBindingSites.length > 0) {
        const sites = orderRIS(regulatorBindingSites,allCitations)
        return (
            <table>
                <thead>
                    <tr>
                        <th style={tbTitle} colSpan="9" >{title}</th>
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
                                <tr key={`tr-bs-${index}-${site["_id"]}`}

                                >
                                    {site.map((dt, i) => {
                                        return (
                                            <td key={`td-bs-<${index}-${i}`}>
                                                {dt}
                                            </td>
                                        )
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

function orderRIS(rbs,allCitations) {
    //console.log(`rbs`, rbs)
    let sites = []
    rbs.map(bs => {
        bs?.regulatoryInteractions.map((ri, indx) => {
            const rs = ri?.regulatorySite
            let site = []
            site["_id"] = rs?._id
            site["ri_id"] = ri?._id
            site.push(bs?.regulator?.name)
            site.push(ri?.function)
            site.push(" ")
            site.push(ri?.centerPosition)
            site.push(rs?.absolutePosition)
            site.push(rs?.leftEndPosition)
            site.push(rs?.rightEndPosition)
            site.push(<MarkSequenceSimple id={`${rs?._id}-${ri?._id}summaryInfo`} data_sequence={{
                sequence: rs?.sequence, posL: rs?.leftEndPosition, posR: rs?.rightEndPosition
            }} />)
            site.push(<div>{ParagraphCitations({
                allCitations: allCitations,
                citations: ri?.citations
            })}</div>)
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

/**
 * onMouseEnter={() => {
                                    let gn = document.getElementById(`${site["ri_id"]}#tu_Canva${tuId}/s`)
                                    if (gn) {
                                        gn.setAttribute("stroke", "#00F");
                                        gn.setAttribute("stroke-width", "2");
                                    }
                                }}
                                onMouseLeave={() => {
                                    let gn = document.getElementById(`${site["ri_id"]}#tu_Canva${tuId}/s`)
                                    if (gn) {
                                        gn.setAttribute("stroke", "");
                                        gn.setAttribute("stroke-width", "0");
                                    }
                                }}
 */