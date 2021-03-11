import React from 'react'
import Sumary from './operon_sumary'


export const Description = ({ idOperon, conf, isTUviews = true }) => {
    const sumaryConf = conf?.sections?.sumary
    const context = conf?.sections?.general_context
    const TUsConf = conf?.sections?.TUs
    return (
        <article>
            <h2>{conf?.title}</h2>
            <br />
            <div dangerouslySetInnerHTML={{ __html: conf.description }} />
            <br />
            <h3>{sumaryConf?.title}</h3>
            <div dangerouslySetInnerHTML={{__html: sumaryConf?.description}} />
            <div style={{ overflow: "auto" }}>
                <br/>
                <Sumary idOperon={idOperon} />
            </div>
            <h3>{context.title}</h3>
            <br />
            <div dangerouslySetInnerHTML={{ __html: context.description }} />
            {
                isTUviews
                    ? <ViewTus TUsConf={TUsConf} />
                    : null
            }

        </article>
    )
}

export default Description

function ViewTus({TUsConf}) {
    return(
        <>
        <h3>{TUsConf?.title}</h3>
        <br />
        <div dangerouslySetInnerHTML={{ __html: TUsConf.description }} />
        </>    
    )
}