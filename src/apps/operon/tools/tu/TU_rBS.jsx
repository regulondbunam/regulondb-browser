import React, { useState } from 'react'
import { RBSbyStite } from "./rBS_byStite";
import RBS_fullInfo from './rBS_fullInfo'

export const TUrBS = ({ id_tu, data_tu, conf }) => {
    const [_view, set_view] = useState("fi");
    return (
        <div>
            <h2>{conf?.title}</h2>
            <div style={{ marginLeft: "5%" }}>
                <select value={_view} onChange={(event) => { set_view(event.target.value) }}>
                    <option value="si">Summary Information</option>
                    <option value="fi">Full Information</option>
                </select>
                {view(_view,data_tu,id_tu)}
            </div>
        </div>
    )
}

function view(value,data_tu,id_tu) {
    switch (value) {
        case "fi":
            return RBS_fullInfo(data_tu, id_tu);
        default:
            return RBSbyStite(data_tu, id_tu);
    }
    
}
