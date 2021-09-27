import React, { useEffect, useState } from 'react'
import { Tabs } from "../../../components/ui-components/ui_components";
import Description from "../tools/operon_description"
import All from "./operon_all"
import TUs from '../tools/operon_TUs'



export const Tab = ({ idOperon, tuId, nTUs = 0, confJSON, setState }) => {

    const [_nametu, set_nametu] = useState(undefined)
    const conf = confJSON?.pages?.operon_info
    let tabSelect = confJSON?.pages?.operon_info?.conf?.tabSelect
    if(tuId){
        tabSelect = conf?.tabs?.TUs?.id
    }
    
    
    useEffect(() => {
        if (!_nametu) {
            set_nametu(`${conf?.tabs?.TUs?.name} (${nTUs}) `)
        }
    }, [_nametu, nTUs, conf])

    if (_nametu) {
        conf.tabs.TUs.name = _nametu
        return (
            <Tabs tabsObj={conf.tabs}
                tabSelect={tabSelect}
                tabs={FormTabs(nTUs, idOperon, conf)}
            />
        )
    }
    return <></>
}

export default Tab

function FormTabs(nTUs, idOperon, conf) {
    return Object.keys(conf.tabs).map(function (key) {
        const tu = conf.tabs[key];
        switch (tu.id) {
            case conf.tabs.all.id:
                return (
                    <All
                        conf={conf}
                        id={conf.tabs.all.id}
                        idOperon={idOperon}
                    />
                )
            case conf.tabs.description.id:
                return (
                    <Description
                        idOperon={idOperon}
                        id={conf.tabs.description.id}
                        conf={conf.tabs.description}
                        
                    />
                )
            case conf?.tabs?.TUs?.id:
                if (nTUs <= 0) {
                    return (
                        <></>
                    )
                }
                return (
                    <TUs
                        idOperon={idOperon}
                        id={conf?.tabs?.TUs?.id}
                        conf={conf?.tabs?.TUs}
                    />
                )
            default:
                return (
                    <></>
                )
        }
    })
}