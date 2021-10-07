import React, { useState } from 'react'
import { RBSbyStite } from "./rBS_byStite";
import RBS_fullInfo from './rBS_fullInfo'
import { CitationCONTEXT } from '../../../../components/citations/citations_provider';

export const TUrBS = ({ id_tu, data_tu, conf }) => {
    const [_view, set_view] = useState("Full Information");
    return (
        <div style={{ marginLeft: "5%" }}>
            <h2>{conf?.title}</h2>
            <div className="dropdown">
                <button>{_view}<i className='bx bx-chevron-down'></i></button>
                <div className="dropdown-content">
                    <button className="dropdown-button" onClick={()=>{
                        set_view("Summary Information")
                    }} 
                    >Summary Information</button>
                    <button className="dropdown-button" onClick={()=>{
                        set_view("Full Information")
                    }}
                    >Full Information</button>
                </div>
            </div>
            <div style={{ marginLeft: "5%" }}>
                {
                    View(_view, data_tu, id_tu)
                }
            </div>
        </div>
    )
}

function View(value, data_tu, id_tu) {
    switch (value) {
        case "Full Information":
            return RBS_fullInfo(data_tu, id_tu, CitationCONTEXT);
        default:
            return RBSbyStite(data_tu, id_tu, CitationCONTEXT);
    }

}
