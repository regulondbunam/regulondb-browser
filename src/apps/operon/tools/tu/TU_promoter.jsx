import React, { useState } from 'react'
import { GetPromoter } from '../../webServices/tu_ws'
import { MarkSequencePromoter } from './promoter_components/mkSequence'

export const TUpromoter = ({ id_tu, id_operon }) => {
    const [_data, set_data] = useState();
    const [_state, set_state] = useState();
    //let loading = false;
    //console.log(_data)
    switch (_state) {
        case "loading":
            //loading = true
            break;
        case "error":
            return <>error</>
        case "done":
            return <Genes data={_data} id_tu={id_tu} />
        default:
            break
    }
    if (id_tu) {
        return (
            <div>
                loading...
                <GetPromoter id_operon={id_operon}
                    resoultsData={(data) => { set_data(data) }}
                    status={(state) => { set_state(state) }}
                />
            </div>
        )
    }
    console.error("TU_promoter no id")
    return <>no - id</>
}

function Genes({ data, id_tu }) {
    try {
        const strand = data?.operon?.strand
        data = data.transcriptionUnits
        const tu = data.find(element => element.id === id_tu);
        //console.log(tu)
        return (
            <div style={{ marginLeft: "5%" }}>
                <h3>{tu?.promoter?.name}</h3>
                {
                    notNull(tu?.promoter?.note,
                        <p dangerouslySetInnerHTML={{ __html: tu?.promoter?.note }} />
                    )
                }
                <table>
                    <tbody>
                        {
                            notNull(tu?.promoter?.id,
                                <tr>
                                    <td style={{ fontWeight: "bold" }}>ID</td>
                                    <td>{tu?.promoter?.id}</td>
                                </tr>
                            )
                        }
                        {
                            notNull(tu?.promoter?.name,
                                <tr>
                                    <td style={{ fontWeight: "bold" }}>Name</td>
                                    <td>{tu?.promoter?.name}</td>
                                </tr>
                            )
                        }
                        {
                            notNull(tu?.promoter?.synonyms,
                                <tr>
                                    <td style={{ fontWeight: "bold" }}>synonyms</td>
                                    <td>{
                                        tu?.promoter?.synonyms.map((s) => {
                                            return ` ${s}`
                                        }).join(",")
                                    }</td>
                                </tr>
                            )
                        }
                        {
                            notNull(tu?.promoter?.bindsSigmaFactor,
                                <tr>
                                    <td style={{ fontWeight: "bold" }}>bindsSigmaFactor</td>
                                    <td>{tu?.promoter?.bindsSigmaFactor?.sigmaFactor_name}</td>
                                </tr>
                            )
                        }
                        {
                            notNull(strand,
                                <tr>
                                    <td style={{ fontWeight: "bold" }}>Strand</td>
                                    <td>{strand}</td>
                                </tr>
                            )
                        }
                        {
                            notNull(tu?.promoter?.sequence,
                                <tr>
                                    <td colSpan="2" style={{ fontWeight: "bold" }}>Sequence</td>
                                </tr>
                            )
                        }
                        {
                            notNull(tu?.promoter?.sequence,
                                <tr>
                                    <td colSpan="2" >
                                        <div
                                            style={{
                                                width: "100%",
                                                overflow: "auto"
                                            }}
                                        >
                                            <MarkSequencePromoter sequence={tu?.promoter?.sequence} id={tu?.promoter?.id} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    } catch (error) {
        console.error(error)
    }
    return <>no promoters</>
}

function notNull(data, element) {
    
    if(data === undefined){
        return null
    }
    if (data === null || data.length < 1 || data === "") {
        return null
    }
    return element
}