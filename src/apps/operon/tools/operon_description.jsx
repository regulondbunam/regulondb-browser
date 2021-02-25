import React from 'react'
import Sumary from './operon_sumary'

export const Description = ({ idOperon, conf, isTUviews = true }) => {
    return (
        <>
            <h2>Operon Description</h2>
            <br />
            <div dangerouslySetInnerHTML={{ __html: conf.description }} />
            <br />
            <h3>Sumary</h3>
            <div style={{ overflow: "auto" }}>
                <Sumary idOperon={idOperon} />
            </div>
            <h3>General Context</h3>
            {
                isTUviews
                    ? <h3>Transcription Unit</h3>
                    : null
            }

        </>
    )
}

export default Description