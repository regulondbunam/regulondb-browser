import React from 'react'
import { Tabs } from "../../../components/ui-components/ui_components";
import conf from "../conf/operon.conf.json"
import Description from "../tools/operon_description"
import All from "./operon_all"



export const Tab = ({ idOperon, nTUs = 0 }) => {
    const descTab = conf.tabs.description
    conf.tabs.TU.name = `${conf.tabs.TU.name} (${nTUs}) `
    return (
        <Tabs tabsObj={conf.tabs}
            tabSelect={descTab.id}
            tabs={FormTabs(nTUs, idOperon)}
        />
    )
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
                if(nTUs>0){
                    return(
                        <></>
                    )
                }
                break;
            default:
                break;
        }
        return tu.name
    })
}