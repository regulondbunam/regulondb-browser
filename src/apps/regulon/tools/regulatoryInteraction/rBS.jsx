import React, {useState} from 'react'
import { RBSbyStite } from "./rbs/rBS_byStite";
import RBSbyFull from './rbs/rBS_fullInfo'

export const RBS = ({ rbs }) => {
    return(
        <table style={{marginLeft: "5%"}} >
            <thead>
                <tr className=".tableContent-th-subtitle">
                    <th>Binding Site</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><SwitchView rbs={rbs} /></td>
                </tr>
            </tbody>
        </table>
    )
}

const SwitchView = ({rbs}) => {
    const [_view, set_view] = useState("by site");

    function swt() {
        try {
            switch (_view) {
                case "by site":
                    return (
                        <>
                            <RBSbyStite rbs={rbs}/>
                        </>
                    )
                default:
                    return <RBSbyFull rbs={rbs} type="regulator" />
            }
        } catch (error) {
            console.log(error)
        }
        return <>error show bs</>
    }

    return (
        <div>
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

