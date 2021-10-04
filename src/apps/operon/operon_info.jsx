import React, { useState } from 'react'
import Tabs from "./components/operon_tabs";
import Conf from './conf/confRaw.conf'

export const Info = ({ id, data, tuId, nTUs}) => {
    const [_conf, set_conf] = useState()


    if (id && _conf) {
        return (
            <div>
                <Tabs tuId={tuId} data={data[0].operon} id_operon={id} nTUs={nTUs} confJSON={_conf} />
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

