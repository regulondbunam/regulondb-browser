import React from 'react'


import Tabs from "./components/operon_tabs";
//import conf from './conf/operon.conf.json'
//const info = conf.pages.operon_info

export const Info = ({ id, idType, nTUs, showTabs }) => {
    if (id) {
        return (
            <div>
                <Tabs idOperon={id} nTUs={nTUs} />
            </div>
        )
        
    }
    console.error("no id in component operon_info")
    return (
        <div>
            No ID
        </div>
    )
}

export default Info

