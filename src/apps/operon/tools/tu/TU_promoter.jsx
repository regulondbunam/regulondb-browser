import React from 'react'
import { MarkSequencePromoter } from './promoter_components/mkSequence'
import { CitationsNote } from '../../components/citations/citations_note'
import { CitationCONTEXT } from '../../components/citations/citations_provider'
import { ParagraphCitations } from '../../components/citations/citations';
import { Link } from 'react-router-dom';

export const TUpromoter = ({ id_tu, data_tu, conf }) => {
    //console.log(data_tu?.promoter)
    try {
        if (!data_tu?.promoter) {
            return null
        }
        return (
            <div style={{padding: "0% 0% 0% 10%", marginRight: "10%"}}
                onMouseEnter={() => {
                    let gn = document.getElementById(`${data_tu?.promoter?.id}#tu_Canva${id_tu}/s`)
                    if (gn) {
                        gn.setAttribute("stroke", "#00F");
                        gn.setAttribute("stroke-width", "2");
                    }
                }}
                onMouseLeave={() => {
                    let gn = document.getElementById(`${data_tu?.promoter?.id}#tu_Canva${id_tu}/s`)
                    if (gn) {
                        gn.setAttribute("stroke", "");
                        gn.setAttribute("stroke-width", "0");
                    }
                }}
            >
                <h2>{conf?.title}</h2>
                <p style={{ marginLeft: "5%" }} dangerouslySetInnerHTML={{ __html: conf?.description }} />
                <div style={{ marginLeft: "5%" }}>
                    <h3>{data_tu?.promoter?.name}</h3>
                    {
                        notNull(data_tu?.promoter?.note,
                            <p dangerouslySetInnerHTML={{ __html: CitationsNote(CitationCONTEXT, data_tu?.promoter?.note) }} />
                        )
                    }
                    <table>
                        <tbody>
                            {
                                notNull(data_tu?.promoter?.id,
                                    <tr>
                                        <td>
                                            <p style={{ fontWeight: "bold" }}>ID</p>
                                            <p>{data_tu?.promoter?.id}</p>
                                        </td>
                                    </tr>
                                )
                            }
                            {
                                notNull(data_tu?.promoter?.name,
                                    <tr>
                                        <td>
                                            <p style={{ fontWeight: "bold" }}>Name</p>
                                            <p>{data_tu?.promoter?.name}</p>
                                        </td>
                                    </tr>
                                )
                            }
                            {
                                notNull(data_tu?.promoter?.synonyms,
                                    <tr>
                                        <td>
                                            <p style={{ fontWeight: "bold" }}>synonyms</p>
                                            <p>{
                                                data_tu?.promoter?.synonyms.map((s) => {
                                                    return ` ${s}`
                                                }).join(",")
                                            }</p>
                                        </td>
                                    </tr>
                                )
                            }
                            {
                                notNull(data_tu?.promoter?.sequence,
                                    <tr>
                                        <td colSpan="2" style={{ fontWeight: "bold" }}>Sequence</td>
                                    </tr>
                                )
                            }
                            {
                                notNull(data_tu?.promoter?.sequence,
                                    <tr>
                                        <td colSpan="2" >
                                            <div
                                                style={{
                                                    width: "100%",
                                                    overflow: "auto"
                                                }}
                                            >
                                                <MarkSequencePromoter sequence={data_tu?.promoter?.sequence} id={data_tu?.promoter?.id} strand={data_tu?.promoter?.strand} />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                            {
                                notNull(data_tu?.promoter?.citations,
                                    <tr>
                                        <td colSpan="2" style={{ fontWeight: "bold" }}>
                                            <p>Citations: </p>
                                            <ParagraphCitations CitationCONTEXT={CitationCONTEXT} citations={data_tu?.promoter?.citations} />
                                        </td>
                                    </tr>
                                )
                            }
                            {
                                notNull(data_tu?.promoter?.bindsSigmaFactor,
                                    <tr>
                                        <td>
                                            <p style={{ fontWeight: "bold" }}>Binds sigma factor:</p>
                                            <p><Link to={`/sigmaFactor/${data_tu?.promoter?.bindsSigmaFactor?.sigmaFactor_id}`} >{data_tu?.promoter?.bindsSigmaFactor?.sigmaFactor_name}</Link></p>
                                            <p>citations: <ParagraphCitations CitationCONTEXT={CitationCONTEXT} citations={data_tu?.promoter?.bindsSigmaFactor?.citations} /></p>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    } catch (error) {
        console.error(error)
    }
    return <></>
}


function notNull(data, element) {

    if (data === undefined) {
        return null
    }
    if (data === null || data.length < 1 || data === "") {
        return null
    }
    return element
}