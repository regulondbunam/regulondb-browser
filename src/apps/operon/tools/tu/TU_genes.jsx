import { DataTuGenes } from '../../webServices/operon_ws_TU'
import React, {useState} from 'react'

export const TUgenes = ({idTU}) => {
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
                <DataTuGenes id={idTU}
                    resoultsData={(data) => { set_data(data) }}
                    status={(state) => { set_state(state) }}
                />
            </div>
        )
    }
    return <>no id</>
}

function Genes({data,idTU}) {
    try {
        const tu = data.find(element => element.id === idTU);
        //console.log(tu)
        return(
            <div style={{marginLeft: "5%"}}>
            {
                tu.genes.map((gene)=>{
                    return <a style={{paddingRight: '10px'}} key={`link_gene${gene.id}`} href={`/gene/${gene.id}`} >{gene.name}</a>
                })
            }
            </div>
        )
    } catch (error) {
        console.log(error)
    }
    return <>no id</>
}