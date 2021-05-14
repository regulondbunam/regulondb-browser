import React from 'react'
import confJSON from '../conf/operon.conf.json'
import Description from '../tools/operon_description'
import TUs from '../tools/operon_TUs'

const conf = confJSON?.pages?.operon_info

export const All = ({ idOperon }) => {
    const descTab = conf.tabs.description
    const allTab = conf.tabs.all
    return (
        <>
            <article>
                <h2>{allTab.title}</h2>
                <div style={{marginLeft: "5%"}} dangerouslySetInnerHTML={{ __html: allTab.description }} />
            </article>
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
        </>
    )
}

export default All