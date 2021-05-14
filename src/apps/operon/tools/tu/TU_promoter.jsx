import React, { useState } from 'react'
import { DataTUpromoter } from '../../webServices/operon_ws_TU'

export const TUpromoter = ({ idTU }) => {
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
            return <Genes data={_data} idTU={idTU} />
        default:
            break
    }
    if (idTU) {
        return (
            <div>
                loading...
                <DataTUpromoter id={idTU}
                    resoultsData={(data) => { set_data(data) }}
                    status={(state) => { set_state(state) }}
                />
            </div>
        )
    }
    return <>no id</>
}

function Genes({ data, idTU }) {
    try {
        const tu = data.find(element => element.id === idTU);
        //console.log(tu)
        return (
            <div style={{marginLeft: "5%"}}>
                <h3>{tu?.promoter?.name}</h3>
                {
                    notNull(tu?.promoter?.note,
                        <p dangerouslySetInnerHTML={{ __html: tu?.promoter?.note }} />
                    )
                }
                <table style={{ tableLayout: "fixed", width: "auto" }} >
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
                            notNull(tu?.promoter?.sequence,
                                <tr>
                                    <td style={{ fontWeight: "bold" }}>Sequence</td>
                                    <td>{tu?.promoter?.sequence}</td>
                                </tr>
                            )
                        }
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    } catch (error) {

    }
    return <>no id</>
}

function notNull(data, element) {
    if (data === null || data.length < 1 || data === "" || data === undefined) {
        return null
    }
    return element
}