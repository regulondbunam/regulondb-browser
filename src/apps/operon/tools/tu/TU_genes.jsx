import { GetGenes } from '../../webServices/tu_ws'
import React, { useState } from 'react'

export const TUgenes = ({ id_tu, id_operon, conf }) => {
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
            return <Genes data={_data} id_tu={id_tu} conf={conf} />
        default:
            break
    }
    if (id_tu) {
        return (
            <div>
                loading...
                <GetGenes id_operon={id_operon}
                    resoultsData={(data) => { set_data(data) }}
                    status={(state) => { set_state(state) }}
                />
            </div>
        )
    }
    return <>no id_tu</>
}

function Genes({ data, id_tu, conf }) {
    try {
        //console.log(`data`, data)
        data = data.transcriptionUnits
        const tu = data.find(element => element.id === id_tu);
        //console.log(tu)
        return (
            <>
                <h2>{conf?.title}</h2>
                <p style={{ marginLeft: "5%" }} dangerouslySetInnerHTML={{ __html: conf?.description }} />
                <div style={{ marginLeft: "5%" }}>
                    {
                        tu.genes.map((gene) => {
                            return <a style={{ paddingRight: '10px' }} key={`link_gene${gene.id}`} href={`/gene/${gene.id}`} >{gene.name}</a>
                        })
                    }
                </div>
            </>

        )
    } catch (error) {
        console.log(error)
    }
    return <>no id</>
}