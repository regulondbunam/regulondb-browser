import React, { useState } from 'react'
import Sumary from './description/des_sumary'
import { SpinnerCircle } from '../../../components/ui-components/ui_components'
import DttTool from '../../../components/dtt_tool/dttTool'
import { GetInfo } from '../webServices/operon_ws'

export const Description = ({ idOperon, conf, isTUviews = true }) => {
    const sumaryConf = conf?.sections?.sumary
    const context = conf?.sections?.general_context
    const TUsConf = conf?.sections?.TUs

    const [_data, set_data] = useState()
    const [_state, set_state] = useState()
    if (_data && _state === "done") {
        return (
            <>
                <div style={{ marginLeft: "10%" }}>
                    <h2>{conf?.title}</h2>
                    <div style={{ marginLeft: "5%" }} dangerouslySetInnerHTML={{ __html: conf.description }} />
                </div>
                <nav>
                    <DttTool id={idOperon} context="operon"
                        leftEndPosition={_data.regulationPositions.leftEndPosition}
                        rightEndPosition={_data.regulationPositions.rightEndPosition}
                    />
                </nav>
                <article>
                    <h3>{sumaryConf?.title}</h3>
                    <div style={{ marginLeft: "5%" }} dangerouslySetInnerHTML={{ __html: sumaryConf?.description }} />
                    <div style={{ overflow: "auto" }}>
                        <br />
                        <Sumary idOperon={idOperon} />
                    </div>
                    <br />
                    <div style={{ marginLeft: "5%" }} dangerouslySetInnerHTML={{ __html: context.description }} />
                    {
                        isTUviews
                            ? <ViewTus TUsConf={TUsConf} />
                            : null
                    }
                </article>
            </>
        )
    }
    return (
        <div>
            {
                _state !== "error"
                    ? "Error to load gene info"
                    : <SpinnerCircle />
            }
            <GetInfo id_operon={idOperon}
                resoultsData={(data) => { set_data(data) }}
                status={(state) => { set_state(state) }}
            />
        </div>
    )
}


//
export default Description

function ViewTus({ TUsConf }) {
    return (
        <>
            <h3>{TUsConf?.title}</h3>
            <br />
            <div dangerouslySetInnerHTML={{ __html: TUsConf.description }} />
        </>
    )
}