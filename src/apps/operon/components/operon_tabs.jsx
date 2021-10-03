import React, { useEffect, useState } from 'react'
//import { Tabs } from "../../../components/ui-components/ui_components";
import Description from "../tools/operon_description"
import All from "./operon_all"
import TUs from '../tools/operon_TUs'
import GetGeneticElements from '../webServices/getGeneticElements/getGeneticElements'
import { OperonProvider } from './context/operon_provider'

export const Tabs = ({ id_operon, tuId, nTUs = 0, confJSON, setState, data }) => {

    const [_nametu, set_nametu] = useState(undefined)
    const [_tabSelect, set_tabSelect] = useState(confJSON?.pages?.operon_info?.conf?.tabSelect)
    const [_dnaFeatures, set_dnaFeatures] = useState()

    const conf = confJSON?.pages?.operon_info
    useEffect(() => {
        if (!_nametu) {
            set_nametu(`${conf?.tabs?.TUs?.name} (${nTUs}) `)
        }
    }, [_nametu, nTUs, conf, _tabSelect])

    if (_nametu && _dnaFeatures) {
        conf.tabs.TUs.name = _nametu
        return (
            <div>
                <div className="tabs">
                    {
                        Object.keys(conf.tabs).map((key) => {
                            const tab = conf.tabs[key];
                            let cName = ""
                            if (_tabSelect === tab?.id) {
                                cName = "active"
                            }
                            if(tab.id === conf?.tabs?.TUs?.id && nTUs === 0){
                                return null
                            }
                            if (tab?.disabled) {
                                return null
                            }
                            return (
                                <button
                                    className={cName}
                                    onClick={(e) => {
                                        set_tabSelect(tab?.id)
                                    }}
                                >{tab?.name}</button>
                            )
                        })
                    }
                </div>
                <OperonProvider operonContextElements={_dnaFeatures}>
                {
                   Tab(data,id_operon,conf,_tabSelect)
                }
                </OperonProvider>
            </div>
        )
    }

    return <GetGeneticElements
        leftEndPosition={data.regulationPositions.leftEndPosition}
        rightEndPosition={data.regulationPositions.rightEndPosition}
        resoultsData={(dtt_data)=>{
            set_dnaFeatures(dtt_data)
        }}
    />
}

export default Tabs


function Tab(data,id_operon,conf, tabSelect) {
    switch (tabSelect) {
        case conf.tabs.all.id:
                return (
                    <All
                        conf={conf}
                        id={conf.tabs.all.id}
                        idOperon={id_operon}
                    />
                )
            case conf.tabs.description.id:
                return (
                    <Description
                        idOperon={id_operon}
                        id={conf.tabs.description.id}
                        conf={conf.tabs.description}

                    />
                )
            case conf?.tabs?.TUs?.id:
                return (
                    <TUs
                        idOperon={id_operon}
                        id={conf?.tabs?.TUs?.id}
                        conf={conf?.tabs?.TUs}
                    />
                )
            default:
                return (
                    <></>
                )
    }
}