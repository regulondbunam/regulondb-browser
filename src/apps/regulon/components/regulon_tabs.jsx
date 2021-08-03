import React from 'react'
import { Tabs } from "../../../components/ui-components/ui_components";
import Description from '../tools/regulon_description'
import Regulon from '../tools/regulon_regulon'


export default function RegulonTabs({ id_regulon, conf }) {
    
    return (
        <Tabs
            tabsObj={conf?.tabs}
            tabSelect={conf?.conf?.tabSelect}
            tabs={FormTabs(id_regulon, conf)}
        />
    )
}

function FormTabs(id_regulon, conf) {
    
    return Object.keys(conf.tabs).map(function (key) {
        const tab = conf.tabs[key];
        switch (tab.id) {
            case conf.tabs.all.id:
                return (
                    <div
                        id={conf.tabs.all.id}
                        id_regulon={id_regulon}
                    />
                )
            case conf.tabs.description.id:
                return (
                    <Description
                        id_regulon={id_regulon}
                        id={conf.tabs.description.id}
                        conf={conf.tabs.description}

                    />
                )
            case conf?.tabs?.regulon?.id:
                return (
                    <Regulon
                        id_regulon={id_regulon}
                        id={conf?.tabs?.regulon?.id}
                        conf={conf?.tabs?.regulon}
                    />
                )
            case conf?.tabs?.tfbs?.id:
                return (
                    <div
                        id_regulon={id_regulon}
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