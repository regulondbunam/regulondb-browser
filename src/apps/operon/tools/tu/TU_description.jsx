import React, {useState} from 'react'
import {DataTUdescription} from '../../webServices/operon_ws_TU'

export const TUdescription = ({idOperon}) => {
    const [_data, set_data] = useState();
    const [_state, set_state] = useState();
    let loading = false;
    //console.log(_data)
    switch (_state) {
        case "loading":
            loading = true
            break;
        case "error":
            return <>error</>
        case "done":
            return <>data</>
        default:
            break
    }
    if (idOperon) {
        return (
            <div>
                loading...
                <DataTUdescription id={idOperon}
                    resoultsData={(data) => { set_data(data) }}
                    status={(state) => { set_state(state) }}
                />
            </div>
        )
    }
    return <>no id</>
}
