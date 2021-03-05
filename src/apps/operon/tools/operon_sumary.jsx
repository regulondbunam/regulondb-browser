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
    return (
        <>
            {
                data.map((tu) => {
                    return (
                        <table key={`sumary_tu_${tu.id}`} style={{ tableLayout: "fixed", width: "auto", float: "left", display: "inline-block" }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "center" }}>{`${tu.name}- ${tu?.promoter?.name}`}</th>
                                </tr>
                            </thead>
                            <tbody>
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
                            </tbody>
                        </table>
                    )
                })
            }
        </>
    )
}

export default Sumary
