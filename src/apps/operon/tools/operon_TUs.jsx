import React, {useState} from 'react'
import {GetTUs} from '../webServices/operon_ws_TUs'

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
    console.log(data)
    return(
        <div>
            <h2>Transcription Units</h2>
        </div>
    )
}

