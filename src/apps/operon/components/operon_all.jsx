import React from 'react'
import confJSON from '../conf/operon.conf.json'
import Description from '../tools/operon_description'
import TUs from '../tools/operon_TUs'
import AllCitations from '../tools/operon_citations'

export const All = ({ idOperon, conf }) => {
    const descTab = conf.tabs.description
    return (
        <>
            <Description
                idOperon={idOperon}
                id={descTab.id}
                conf={descTab}
                isTUviews={false}
            />
            <TUs
                idOperon={idOperon}
                id={conf?.tabs?.TUs?.id}
                conf={conf?.tabs?.TUs}
            />
            <AllCitations idOperon={idOperon} />
        </>
    )
}

export default All