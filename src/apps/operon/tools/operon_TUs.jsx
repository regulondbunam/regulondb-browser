import React, {useState} from 'react'
import { Tabs } from '../../../components/ui-components/web/tab/tabs';
import {GetTUs} from '../webServices/operon_ws_TUs'
import TU from "./operon_TU"

const TUs = ({idOperon, conf}) => {
    //console.log(conf)
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
            return <>{TU_tabs(_data,conf,idOperon)}</>
        default:
            break
    }
    return (
        <div>
            <h2>{conf?.title}</h2>
            <br/>
            <div dangerouslySetInnerHTML={{__html: conf?.description}} />
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

function TU_tabs(data,conf,idOperon){
    const sections_conf = conf?.sections
    //console.log(data)
    return(
        <div>
            <article>
            <h2>{conf?.title}</h2>
            <br/>
            <div dangerouslySetInnerHTML={{__html: conf?.description}} />
            </article>
            <Tabs backgroundColor="#ffffff" lineColor="#99999999" tabSelect={data.transcriptionUnits[0].id} tabsInfo={formInfoTabs(data.transcriptionUnits)} tabs={formTUTabs(data.transcriptionUnits,sections_conf,idOperon)} />
        </div>
    )
}

function formTUTabs(tus, sections_conf,idOperon){
    //console.log(tus)
    const tabsInfo = tus.map((tu)=>{
        return <TU conf={sections_conf}  id={tu?.id} idOperon={idOperon} name={`${tu.name} - ${tu?.promoter?.name}`} />
    })
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