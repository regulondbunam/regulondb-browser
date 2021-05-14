import React, {useState} from 'react'
import {DataTUrBS} from '../../webServices/operon_ws_TU'
import { RBSbyStite } from "./rBS_byStite";

export const TUrBS = ({ idTU }) => {
    // eslint-disable-next-line no-unused-vars
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
            return <SwitchView idTU={idTU} data={dataE} />
        default:
            break
    }
    if (idTU) {
        return (
            <div>
                loading...
                <DataTUrBS id={idTU}
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
                return <RBSbyStite data={data} />
            default:
                return <>no valid option</>
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


const dataE = [
    {
        type: "proximal",
        "Transcription Factor": "CRP-cAMP",
        "Function": "activator",
        "Promoter": "glnAp1",
        "LeftPos": 1000,
        "RightPos": 1500,
        "Central Rel-Pos": -71.5,
        "sequence": "ttcctgacttAAGCGGCGCTGGTTATCCATcggagccatc",
        "Growth Conditions": "nd",
        "Evidence References": "---"
    },
    {
        type: "proximal",
        "Transcription Factor": "CRP-cAMP",
        "Function": "represor",
        "Promoter": "glnAp1",
        "LeftPos": 1000,
        "RightPos": 1500,
        "Central Rel-Pos": -71.5,
        "sequence": "ttcgacgtgctagctagctttAAGCGGCACTTGCAGCTGGTTATCCATccgcgtactgacggagccatc",
        "Growth Conditions": "nd",
        "Evidence References": "---"
    }
]
