import React from 'react'
import { Tabs } from "../../../components/ui-components/ui_components";
import conf from "../conf/operon.conf.json"
import Description from "../tools/operon_description"



export const Tab = ({idOperon}) => {
    const descTab = conf.tabs.description
    return (
        <Tabs tabsObj={conf.tabs}
            tabSelect={descTab.id}
            tabs={[
                <Description
                      idOperon={idOperon}
                      id={descTab.id}
                      conf={descTab}
                />
            ]}
        />
    )
}

export default Tab
