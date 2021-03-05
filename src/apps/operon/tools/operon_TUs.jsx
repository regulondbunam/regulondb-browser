import React, {useState} from 'react'
import { Tabs } from '../../../components/ui-components/web/tab/tabs';
import {GetTUs} from '../webServices/operon_ws_TUs'
import TU from "./operon_TU"

const TUs = ({idOperon}) => {
    const [_data, set_data] = useState();
    const [_state, set_state] = useState();
    let loading = false;
    switch (_state) {
        case "loading":
            loading = true
            break;
        case "error":
            return <>error</>
        case "done":
            return <>{TU_tabs(_data)}</>
        default:
            break
    }
    return (
        <div>
            <h2>Transcription Units</h2>
            {
                loading ? <>loading...</> : null
            }
            <GetTUs id={idOperon}
                resoultsData={(data) => { set_data(data) }}
                status={(state) => { set_state(state) }}
            />
        </div>
    )
}

export default TUs

function TU_tabs(data){
    //console.log(data)
    return(
        <div>
            <article>
            <h2>Transcription Units</h2>
            </article>
            <Tabs tabSelect={data.transcriptionUnits[0].id} tabsInfo={formInfoTabs(data.transcriptionUnits)} tabs={formTUTabs(data.transcriptionUnits)} />
        </div>
    )
}

function formTUTabs(tus){
    //console.log(tus)
    const tabsInfo = tus.map((tu)=>{
        return <TU  id={tu?.id} idOperon={tu?.id} name={`${tu.name} - ${tu?.promoter?.name}`} />
    })
    console.log(tabsInfo)
    return tabsInfo
}

function formInfoTabs(tus){
    //console.log(tus)
    const tabsInfo = tus.map((tu)=>{
        return {
            "id": tu?.id,
            "name": `${tu.name} - ${tu?.promoter?.name}`,
            "disabled": false
        }
    })
    return tabsInfo
}