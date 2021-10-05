import React from 'react'
import { MarkSequenceWithPositions } from "./bs_compnents/mkSequence";
import { CitationsNote } from '../../../../components/citations/citations_note'
import { CitationCONTEXT } from '../../../../components/citations/citations_provider';
import { ParagraphCitations } from '../../../../components/citations/citations';
//import { IconButton } from '../../../../components/ui-components/ui_components'



// eslint-disable-next-line no-unused-vars
const styleIconButton = {
    width: "20px",
    height: "20px",
    float: "left"
}

export default function RBS_full(data_tu, id_tu) {
    const PROMOTER = data_tu?.promoter
    const GENES = data_tu?.genes
    return (
        <div>
            {
                Promoter_RBSs(PROMOTER, id_tu)
            }
            {
                data_tu?.genes
                    ? GENES.map(gene => {
                        return <div key={`rbss_${gene.id}`}>
                            {
                                Genes_RBSs(gene, id_tu)
                            }
                        </div>
                    })
                    : null
            }
        </div>
    )
}

function Promoter_RBSs(promoter, id_tu) {
    const RBS = promoter?.regulatorBindingSites
    //console.log(RBS)
    return (
        <div>
            {
                RBS.map(rbs => {
                    const regulator = rbs?.regulator
                    const regulatoryInteractions = rbs?.regulatoryInteractions
                    if (!regulator || !regulatoryInteractions) {
                        return null
                    }
                    return (
                        <table className="table_content" key={`tabe_regulatorRBS_${regulator?._id}`}>
                            <thead>
                                <tr>
                                    <th>{`Regulator ${regulator.name}, ${regulator.function} `}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{`Linked to Promoter ${promoter?.name}`}</td>
                                </tr>
                                <tr>
                                        {
                                            tableRI(regulatoryInteractions, id_tu)
                                        }
                                </tr>
                            </tbody>
                        </table>
                    )
                })
            }
        </div>
    )
}

function Genes_RBSs(gene, id_tu) {
    const RBS = gene?.regulatorBindingSites
    //console.log(RBS)
    return (
        <div>
            {
                RBS.map(rbs => {
                    const regulator = rbs?.regulator
                    const regulatoryInteractions = rbs?.regulatoryInteractions
                    if (!regulator || !regulatoryInteractions) {
                        return null
                    }
                    return (
                        <table className="table_content" key={`tabe_regulatorRBS_${regulator?._id}`}>
                            <thead>
                                <tr>
                                    <th>{`Regulator ${regulator.name}, ${regulator.function} `}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{`Linked to Gene ${gene?.name}`}</td>
                                </tr>
                                <tr>
                                        {
                                            tableRI(regulatoryInteractions, id_tu)
                                        }
                                </tr>
                            </tbody>
                        </table>
                    )
                })
            }
        </div>
    )
}

function tableRI(regulatoryInteractions, id_tu) {
    return (
        <td>
            {
                regulatoryInteractions.map(ri => {
                    const rSite = ri?.regulatorySite
                    return (
                        <div style={{ marginLeft: "2%" }} key={`tabe_Rinteraction_${ri?._id}`}
                            onMouseEnter={() => {
                                let gn = document.getElementById(`${ri?._id}#tu_Canva${id_tu}/s`)
                                if (gn) {
                                    gn.setAttribute("stroke", "#00F");
                                    gn.setAttribute("stroke-width", "2");
                                }
                            }}
                            onMouseLeave={() => {
                                let gn = document.getElementById(`${ri?._id}#tu_Canva${id_tu}/s`)
                                if (gn) {
                                    gn.setAttribute("stroke", "");
                                    gn.setAttribute("stroke-width", "0");
                                }
                            }}
                        >
                            <table className="table_content" >
                                <thead>
                                    <tr>
                                        <th>{`Regulatory Interaction ${ri?.function.toUpperCase()}`}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ri?.mechanism
                                            ? <tr><td>{`Mechanism: ${ri?.mechanism}`}</td></tr>
                                            : null
                                    }
                                    {
                                        ri?.regulatorySite
                                            ? <table>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <MarkSequenceWithPositions id={`cav-${ri?._id}-${rSite?._id}`} sequenceInfo={{
                                                                sequence: rSite?.sequence, posL: rSite?.leftEndPosition, posR: rSite?.rightEndPosition
                                                            }} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            {`Center Position: ${ri?.centerPosition}, Absolute Position: ${rSite?.absolutePosition}`}
                                                        </td>
                                                    </tr>
                                                    {
                                                        rSite?.note
                                                            ? <tr><td> <p dangerouslySetInnerHTML={{ __html: CitationsNote(CitationCONTEXT, rSite?.note) }} /></td></tr>
                                                            : null
                                                    }
                                                    {
                                                        rSite?.citations
                                                            ? <tr>
                                                                <td>
                                                                    <p>Regulatory Site Citations</p>
                                                                    {ParagraphCitations({
                                                                        CitationCONTEXT: CitationCONTEXT,
                                                                        citations: rSite?.citations
                                                                    })}
                                                                </td>
                                                            </tr>
                                                            : null
                                                    }
                                                </tbody>
                                            </table>
                                            : null
                                    }
                                    {
                                        ri?.note
                                            ? <tr><td> <p dangerouslySetInnerHTML={{ __html: CitationsNote(CitationCONTEXT, ri?.note) }} /></td></tr>
                                            : null
                                    }
                                    {
                                        ri?.citations
                                            ? <tr>
                                                <td>
                                                    <p>Regulatory Interaction Citations</p>
                                                    {ParagraphCitations({
                                                        CitationCONTEXT: CitationCONTEXT,
                                                        citations: ri?.citations
                                                    })}
                                                </td>
                                            </tr>
                                            : null
                                    }

                                </tbody>
                            </table>
                        </div>
                    )
                })
            }
        </td>
    )
}