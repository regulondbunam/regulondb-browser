import React from 'react'
import MkSequence from "./bs_compnents/mkSequence";
import { CitationsNote } from '../../components/citations/citations_note'
import { ParagraphCitations } from '../../components/citations/citations';
//import { IconButton } from '../../../../components/ui-components/ui_components'

let CitationCONTEXT

// eslint-disable-next-line no-unused-vars
const styleIconButton = {
    width: "20px",
    height: "20px",
    float: "left"
}

export default function RBS_full(data_tu, id_tu, Citation_CONTEXT) {
    const PROMOTER = data_tu?.promoter
    const GENES = data_tu?.genes
    CitationCONTEXT = Citation_CONTEXT
    return (
        <div>
            {
                Promoter_RBSs(PROMOTER, id_tu)
            }
            {
                data_tu?.genes
                    ? GENES.map((gene, indx) => {
                        return <div key={`rbss_${gene.id}_${indx}`}>
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
    let RBS = promoter?.regulatorBindingSites
    if(!RBS){
        return <></>
    }
    return (
        <div>
            {
                RBS.map((rbs, indx) => {
                    const regulator = rbs?.regulator
                    const regulatoryInteractions = rbs?.regulatoryInteractions
                    if (!regulator || !regulatoryInteractions) {
                        return null
                    }
                    return (
                        <table className="table_content" key={`tabe_regulatorRBS_promoter_${regulator?._id}_${indx}`}>
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
    return (
        <div>
            {
                RBS.map((rbs, indx) => {
                    const regulator = rbs?.regulator
                    const regulatoryInteractions = rbs?.regulatoryInteractions
                    if (!regulator || !regulatoryInteractions) {
                        return null
                    }
                    return (
                        <table className="table_content" key={`tabe_regulatorRBS_${regulator?._id}_${gene.id}`}>
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
                regulatoryInteractions.map((ri, indx) => {
                    const rSite = ri?.regulatorySite;
                    return (
                        <div style={{ marginLeft: "2%" }} key={`tabe_Rinteraction_${ri?._id}_${indx}`}
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
                                    <tr>
                                        <td>
                                            {
                                                ri?.regulatorySite
                                                    ? <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>

                                                                    <MkSequence id={`cav-${ri?._id}-${rSite?._id}-fullInfo`} positions={true}
                                                                        data_sequence={{
                                                                            sequence: rSite?.sequence, posL: rSite?.leftEndPosition, posR: rSite?.rightEndPosition
                                                                        }}
                                                                    />


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
                                        </td></tr>
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