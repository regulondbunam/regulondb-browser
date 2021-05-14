import React, { useState } from 'react'


import Tabs from "./components/operon_tabs";
import Conf from './conf/confRaw.conf'
//import conf from './conf/operon.conf.json'
//const info = conf.pages.operon_info

export const Info = ({ id, tuId, tabStatus, idType, nTUs, showTabs }) => {
    const [_conf, set_conf] = useState()

    if (id && _conf) {
        return (
            <div>
                <Tabs tuId={tuId} tabStatus={tabStatus} idOperon={id} nTUs={nTUs} confJSON={_conf} />
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

