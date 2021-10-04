import React from 'react'
import { MarkSequencePromoter } from './promoter_components/mkSequence'

export const TUpromoter = ({ id_tu, data_tu, conf }) => {
    try {
        if (!data_tu?.promoter) {
            return null
        }
        return (
            <div
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
                            <p dangerouslySetInnerHTML={{ __html: data_tu?.promoter?.note }} />
                        )
                    }
                    <table>
                        <tbody>
                            {
                                notNull(data_tu?.promoter?.id,
                                    <tr>
                                        <td style={{ fontWeight: "bold" }}>ID</td>
                                        <td>{data_tu?.promoter?.id}</td>
                                    </tr>
                                )
                            }
                            {
                                notNull(data_tu?.promoter?.name,
                                    <tr>
                                        <td style={{ fontWeight: "bold" }}>Name</td>
                                        <td>{data_tu?.promoter?.name}</td>
                                    </tr>
                                )
                            }
                            {
                                notNull(data_tu?.promoter?.synonyms,
                                    <tr>
                                        <td style={{ fontWeight: "bold" }}>synonyms</td>
                                        <td>{
                                            data_tu?.promoter?.synonyms.map((s) => {
                                                return ` ${s}`
                                            }).join(",")
                                        }</td>
                                    </tr>
                                )
                            }
                            {
                                notNull(data_tu?.promoter?.bindsSigmaFactor,
                                    <tr>
                                        <td style={{ fontWeight: "bold" }}>bindsSigmaFactor</td>
                                        <td>{data_tu?.promoter?.bindsSigmaFactor?.sigmaFactor_name}</td>
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
                        </tbody>
                    </table>
                </div>
            </div>
        )
    } catch (error) {
        console.error(error)
    }
    return <>no promoters</>
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