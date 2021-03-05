import React, {useEffect, useState} from 'react'
import { Tabs } from "../../../components/ui-components/ui_components";
import conf from "../conf/operon.conf.json"
import Description from "../tools/operon_description"
import All from "./operon_all"
import TUs from '../tools/operon_TUs'



export const Tab = ({ idOperon, nTUs = 0 }) => {
    const [_ntu, set_ntu] = useState(undefined)
    useEffect(() => {
        if(!_ntu){
            set_ntu(`${conf.tabs.TU.name} (${nTUs}) `)
        }
    },[_ntu, nTUs])
    const descTab = conf.tabs.description
    if(_ntu){
        conf.tabs.TU.name = _ntu
    return (
        <Tabs tabsObj={conf.tabs}
            tabSelect={descTab.id}
            tabs={FormTabs(nTUs, idOperon)}
        />
    )
    }
    return <></>
}

export default Tab

function FormTabs(nTUs, idOperon) {
    return Object.keys(conf.tabs).map(function (key) {
        const tu = conf.tabs[key];
        switch (tu.id) {
            case conf.tabs.all.id:
                return (
                    <All
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
            case conf.tabs.TU.id:
                if(nTUs<=0){
                    return(
                        <></>
                    )
                }
                return (
                    <TUs
                        idOperon={idOperon}
                        id={conf.tabs.TU.id}
                        conf={conf.tabs.TU}
                    />
                )
            default:
                return(
                    <></>
                )
        }
    })
}