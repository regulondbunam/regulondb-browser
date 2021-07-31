import React, { useState, useEffect } from 'react'
import { Cover } from "../../../components/ui-components/ui_components";


export const Title = () => {
    const [_isInfo, set_isInfo] = useState(false);
    const [_state, set_state] = useState();
    const [_title, set_title] = useState("");
    const [_data, set_data] = useState([]);

    useEffect(() => {
        const cover = document.getElementById("div_cover_regulon_01")
        if (cover) {
            cover.addEventListener('coverR', function (e) {
                //console.log(`state`, e.detail)
                if (e.detail.state) {
                    set_state(e.detail.state)
                }
                if (e.detail.title) {
                    set_title(e.detail.title)
                }
                if (e.detail.isInfo) {
                    set_isInfo(true)
                }
                if (e.detail.data) {
                    set_data(e.detail.data)
                }
            }, false);
        }
    }, [])
    return (
        <div id={"div_cover_regulon_01"}>
            <Cover id="component_cover_regulon_01" state={_state}>
                {_isInfo ? "Regulon" : ""}
                <h1 id="cover_regulon_01" style={{margin: "0px 0px 0px 0px"}} >{_title}</h1>
                <Conformations _conformations={_data?.transcriptionFactor?.conformations} />
            </Cover>
        </div>
    )
}

export default Title

function Conformations({_conformations = []}) {
    //console.log(_conformations)
    if(!_conformations || _conformations.length === 0){
        return null
    }
    try {
        _conformations = _conformations.map((value)=>{
            return value?.name
        }).join(", ")
    } catch (error) {
        return null
    }
    return(
        <>
        Conformations
        <h2 style={{margin: "0px 0px 0px 0px"}}  >{_conformations}</h2> 
        </>
    )
}