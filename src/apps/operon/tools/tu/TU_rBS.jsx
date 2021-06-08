import React, {useState} from 'react'
import { GetBindingSites } from '../../webServices/tu_ws'
import { RBSbyStite } from "./rBS_byStite";
import RBSbyFull from './rBS_fullInfo'

export const TUrBS = ({ idTU }) => {
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
            //console.log(_data)
            return <SwitchView idTU={idTU} data={_data} />
        default:
            break
    }
    //
    if (idTU) {
        return (
            <div>
                loading...
                <GetBindingSites id_operon={idTU}
                    resoultsData={(data) => { set_data(data) }}
                    status={(state) => { set_state(state) }}
                />
            </div>
        )
    }
    return <>no id</>
}

const SwitchView = ({idTU,data}) => {
    const [_view, set_view] = useState("by site");

    function swt(view) {
        switch (_view) {
            case "by site":
                return (
                    <>
                        <RBSbyStite data={data} type="promoter"/>
                        <RBSbyStite data={data} type="gene"/>
                    </>
                )
            default:
                return <RBSbyFull data={data} type="promoter" />
        }
    }

    return (
        <div style={{marginLeft: "5%"}}>
        <select value={_view} onChange={(event)=>{set_view(event.target.value)}}>
            <option value="by site">By Site</option>
            <option value="full info">Full info</option>
          </select>
          {
              swt(_view)
          }
        </div>
    )
}

