import React, { useState } from 'react'
import { DataTUdescription } from '../../webServices/operon_ws_TU'

export const TUdescription = ({ idTU }) => {
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
            return <Description data={_data} idTU={idTU} />
        default:
            break
    }
    if (idTU) {
        return (
            <div>
                loading...
                <DataTUdescription id={idTU}
                    resoultsData={(data) => { set_data(data) }}
                    status={(state) => { set_state(state) }}
                />
            </div>
        )
    }
    return <>no id</>
}

function Description({ data, idTU }) {
    try {
        const tu = data.find(element => element.id === idTU);
        return (
            <>
                <h3>{tu?.name}</h3>
                <p style={{marginLeft: "5%"}} dangerouslySetInnerHTML={{ __html: tu?.note }} />
                <div style={{marginLeft: "5%"}} >
                <table style={{ tableLayout: "fixed", width: "auto" }} >
                    <tbody>
                        {
                            notNull(tu?.synonyms,
                            <tr>
                            <td style={{ fontWeight: "bold" }}>synonyms</td>
                            <td>{
                                tu.synonyms.map((s)=>{
                                    return ` ${s}`
                                }).join(",")
                                }</td>
                            </tr>
                            )
                        }
                        {
                             notNull(tu?.firstGene?.gene_id,
                                <tr>
                                <td style={{ fontWeight: "bold" }}>firstGene</td>
                                <td><a style={{paddingRight: '10px'}} key={`link_gene${tu?.firstGene?.gene_id}`} href={`/gene/${tu?.firstGene?.gene_id}`} >{tu?.firstGene?.gene_name}</a></td>
                                </tr>
                                )
                        }
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                </div>
                
            </>
        )
    } catch (error) {
        console.error(error)
    }
    return (
        <>
            no tu data
        </>
    )
}

function notNull(data,element) {
    //console.log(data)
    if (data === null || data.length < 1 || data === "" || data === undefined  ) {
        return null
    }
    return element
}
