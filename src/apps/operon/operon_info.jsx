import React from 'react'
import Tabs from "./components/operon_tabs";
import conf from './conf/operon.conf.json'

export const Info = ({ id, data, tuId, nTUs}) => {



    if (id && conf) {
        return (
            <div>
                <Tabs tuId={tuId} data={data[0].operon} id_operon={id} nTUs={nTUs} confJSON={conf} />
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

}

export default Info

