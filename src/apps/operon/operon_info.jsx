import React, { useState, useEffect } from 'react'


import Tabs from "./components/operon_tabs";
import Conf from './conf/confRaw.conf'
import Title from './components/operon_title'
//import conf from './conf/operon.conf.json'
//const info = conf.pages.operon_info

export const Info = ({ id, tuId, title, nTUs, _data }) => {
    const [_state, set_state] = useState("loading");
    const [_conf, set_conf] = useState()

    useEffect(() => {
        if(_state !== "done"){
            setTimeout(function(){
                set_state("done")
            },1000);
        }
    })

    if (id && _conf) {
        return (
            <div>
                <Title title={title} data={_data} isInfo={true} state={_state} />
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

