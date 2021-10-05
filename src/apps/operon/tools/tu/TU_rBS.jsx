import React, { useState } from 'react'
import { RBSbyStite } from "./rBS_byStite";
import RBSbyFull from './rBS_fullInfo'

export const TUrBS = ({ id_tu, data_tu, conf }) => {
    const [_view, set_view] = useState("by site");

    return (
        <div>
            <h2>{conf?.title}</h2>
            <div style={{ marginLeft: "5%" }}>
                <select value={_view} onChange={(event) => { set_view(event.target.value) }}>
                    <option value="by site">By Site</option>
                    <option value="full info">Full info</option>
                </select>
                {
                    RBSbyFull(data_tu)
                }
            </div>
        </div>
    )
}

function swt(_view, data_tu) {
    try {
        switch (_view) {
            case "by site":
                return (
                    <>
                        <RBSbyStite data={data_tu} type="promoter" />
                        <RBSbyStite data={data_tu} type="gene" />
                    </>
                )
            default:
                return RBSbyFull(data_tu)
        }
    } catch (error) {
        console.log(error)
    }
    return <>error show bs</>
}

