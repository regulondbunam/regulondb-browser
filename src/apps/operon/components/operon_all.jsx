import React from 'react'
import Description from '../tools/operon_description'
import TUs from '../tools/operon_TUs'
import AllCitations from '../tools/operon_citations'

export const All = ({ idOperon, conf }) => {

    return (
        <>
            <Description
                idOperon={idOperon}
                id={conf?.tabs?.description?.id}
                conf={conf?.tabs?.description}
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