import React, {useState} from 'react'
import { Tabs } from '../../../components/ui-components/web/tab/tabs';
import GetTUallInfo from '../webServices/transcriptionUnit/TU_allInfo'
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
            {
                loading ? <>loading...</> : null
            }
            <GetTUallInfo id_operon={idOperon}
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
            <article>
            <h2>{conf?.title}</h2>
            <br/>
            {//<div style={{marginLeft: "5%"}} dangerouslySetInnerHTML={{__html: conf?.description}} />
            }
            <Tabs backgroundColor="#ffffff" lineColor="#99999999" tabSelect={data.transcriptionUnits[0].id} tabsInfo={formInfoTabs(data.transcriptionUnits)} tabs={formTUTabs(data.transcriptionUnits,sections_conf,idOperon)} />
            </article>
    )
}

function formTUTabs(tus, sections_conf,idOperon){
    //console.log(tus)
    const tabsInfo = tus.map((tu)=>{
        return <TU conf={sections_conf} data_tu={tu}  id={tu?.id}  id_tu={tu?.id} idOperon={idOperon} name={`${tu.name} - ${tu?.promoter?.name}`} />
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