import React from 'react'
import RegulonTabs from './components/regulon_tabs'

export default function Info({id_regulon,conf}) {
    //console.log(conf)
    if (id_regulon && conf) {
        return (
            <div>
                <RegulonTabs id_regulon={id_regulon} conf={conf} />
            </div>
        )

    }
    if (!id_regulon) {
        console.error("no id in component operon_info")
        return (
            <div>
                No ID
            </div>
        )
    }
    return <div></div>
}
