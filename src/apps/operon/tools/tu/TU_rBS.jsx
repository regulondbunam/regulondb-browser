import React, {useState} from 'react'
import { GetBindingSites } from '../../webServices/tu_ws'
import { RBSbyStite } from "./rBS_byStite";
import RBSbyFull from './rBS_fullInfo'

export const TUrBS = ({ id_tu, id_operon, conf }) => {
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
            return (
            <>
            <h2>{conf?.title}</h2>
                <p style={{marginLeft: "5%"}} dangerouslySetInnerHTML={{__html: conf?.description}} />
                <SwitchView id_tu={id_tu} data={_data} />
            </>
            )
        default:
            break
    }
    //
    if (id_tu) {
        return (
            <div>
                loading...
                <GetBindingSites id_operon={id_operon}
                    resoultsData={(data) => { set_data(data) }}
                    status={(state) => { set_state(state) }}
                />
            </div>
        )
    }
    return <>no id</>
}

const SwitchView = ({id_tu,data}) => {
    const [_view, set_view] = useState("by site");

    function swt() {
        try {
            //console.log(`data`, data)
            data = data.transcriptionUnits
            data = data.find(element => element.id === id_tu);
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
        } catch (error) {
            console.log(error)
        }
        return <>error show bs</>
    }

    return (
        <div style={{marginLeft: "5%"}}>
        <select value={_view} onChange={(event)=>{set_view(event.target.value)}}>
            <option value="by site">By Site</option>
            <option value="full info">Full info</option>
          </select>
          {
              swt()
          }
        </div>
    )
}

