import React from 'react'
import Sumary from './operon_sumary'

export const Description = ({idOperon, conf}) => {
    return (
        <article>
            <h2>Operon Description</h2>
            <br/>
            <div dangerouslySetInnerHTML={{__html: conf.description}} />
            <br/>
            <h3>Sumary</h3>
            <Sumary idOperon={idOperon} />
        </article>
    )
}

export default Description