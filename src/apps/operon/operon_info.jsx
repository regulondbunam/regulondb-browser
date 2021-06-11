import React, { useState, useEffect } from 'react'


import Tabs from "./components/operon_tabs";
import Conf from './conf/confRaw.conf'

export const Info = ({ id, tuId, nTUs}) => {
    const [_state, set_state] = useState("loading");
    const [_conf, set_conf] = useState()

    useEffect(() => {
        const covera = document.getElementById("div_cover_operon_01")
        if(covera){
            const coverR = new CustomEvent('coverR',{
                bubbles: true,
                detail: { 
                    state: _state,
                }
            });
            covera.dispatchEvent(coverR);
        }
        if(_state !== "done"){
            setTimeout(function(){
                set_state("done")
            },5000);
        }
    })

    if (id && _conf) {
        return (
            <div>
                <Tabs tuId={tuId} idOperon={id} nTUs={nTUs} confJSON={_conf} />
            </div>
        )

    }
    if (!id) {
        console.error("no id in component operon_info")
        return (
            <div>
                No ID
            </div>
        )
    }
    return (
        <div>
            <Conf setConf={(conf)=>{set_conf(conf)}} />
        </div>
    )

}

export default Info

