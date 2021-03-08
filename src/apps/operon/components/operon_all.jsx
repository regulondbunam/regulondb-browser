import React from 'react'
import confJSON from '../conf/operon.conf.json'
import Description from '../tools/operon_description'

const conf = confJSON?.pages?.operon_info

export const All = ({ idOperon }) => {
    const descTab = conf.tabs.description
    const allTab = conf.tabs.all
    return (
        <>
            <article>
                <h2>{allTab.name}</h2>
                <div dangerouslySetInnerHTML={{ __html: allTab.description }} />
            </article>
            <Description
                idOperon={idOperon}
                id={descTab.id}
                conf={descTab}
                isTUviews={false}
            />
        </>
    )
}

export default All