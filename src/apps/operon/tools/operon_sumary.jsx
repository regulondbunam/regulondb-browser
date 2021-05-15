import React, { useState } from 'react'
import { GetSumaryByTU } from '../webServices/operon_ws_sumary'

export const Sumary = ({
    idOperon
}) => {
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
            return <>{SumaryTable(_data)}</>
        default:
            break
    }
    return (
        <div>
            {
                loading ? <>loading...</> : null
            }
            <GetSumaryByTU id={idOperon}
                resoultsData={(data) => { set_data(data) }}
                status={(state) => { set_state(state) }}
            />
        </div>
    )

}

function SumaryTable(data) {
    //console.log(data)
    return (
        <div style={{marginLeft: "5%"}}>
        <table style={{ tableLayout: "fixed", width: "auto", float: "left", display: "inline-block" }}>
            <tbody>
            {
                Object.keys(data).map(function (key) {
                    const test = key.match(/^_/);
                    //console.log(test)
                    if (data[key] === null || data[key].length <= 1 || test !== null) {
                        return null;
                    }
                    return (
                        <tr key={`sumary_statistics_${key}`}>
                            <td style={{ fontWeight: "bold" }}>{key}</td>
                            <td>{data[key]}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
            
        </div>
    )
}

export default Sumary

/*

{
                                    Object.keys(tu.statistics).map(function (key) {
                                        const test = key.match(/^_/);
                                        //console.log(test)
                                        if (tu.statistics[key] === null || tu.statistics[key].length <= 1 || test !== null) {
                                            return null;
                                        }
                                        return (
                                            <tr key={`sumary_statistics_${tu.id}_${key}`}>
                                                <td>{key}</td>
                                                <td>{tu.statistics[key]}</td>
                                            </tr>
                                        )
                                    })
                                }

*/