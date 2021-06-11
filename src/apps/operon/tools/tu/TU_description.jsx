import React, { useState } from 'react'
import { GetInfo } from '../../webServices/tu_ws'

export const TUdescription = ({ id_operon,id_tu }) => {
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
            return <Description data={_data} id_tu={id_tu} />
        default:
            break
    }
    if (id_tu) {
        return (
            <div>
                loading...
                <GetInfo id_operon={id_operon}
                    resoultsData={(data) => { set_data(data) }}
                    status={(state) => { set_state(state) }}
                />
            </div>
        )
    }
    return <>no id</>
}

function Description({ data, id_tu }) {
    try {
        data = data.transcriptionUnits
        const tu = data.find(element => element.id === id_tu);
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
