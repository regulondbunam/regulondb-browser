import React, { useState, useEffect } from 'react'


import Tabs from "./components/operon_tabs";
import Conf from './conf/confRaw.conf'
import Title from './components/operon_title'
//import conf from './conf/operon.conf.json'
//const info = conf.pages.operon_info

export const Info = ({ id, tuId, nTUs}) => {
    const [_conf, set_conf] = useState()

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

