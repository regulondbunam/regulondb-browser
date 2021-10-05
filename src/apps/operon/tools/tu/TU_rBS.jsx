import React, { useState } from 'react'
//import { RBSbyStite } from "./rBS_byStite";
import RBS_fullInfo from './rBS_fullInfo'

export const TUrBS = ({ id_tu, data_tu, conf }) => {
    const [_view, set_view] = useState("by site");

    return (
        <div>
            <h2>{conf?.title}</h2>
            <div style={{ marginLeft: "5%" }}>
                <select value={_view} onChange={(event) => { set_view(event.target.value) }}>
                    <option value="Summary Information">Summary Information</option>
                    <option value="Full Information">Full Information</option>
                </select>
                {
                    RBS_fullInfo(data_tu, id_tu)
                }
            </div>
        </div>
    )
}


