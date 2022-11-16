import React, { useState, useEffect } from 'react'
import GetRegulatoryInteractions from '../webServices/regulon/regulatoryInteractions'
import { RegulatotyInteraction } from './regulatoryInteraction/regulatotyInteraction'
import Table from './regulatoryInteraction/table/ri_table'

export default function RInteractions({ id_regulon, display_ri = true }) {

    const [_data, set_data] = useState()
    const [_state, set_state] = useState()
    const [_view, set_view] = useState("table")


    useEffect(() => {
        const COVER = document.getElementById("div_cover_regulon_01")
        if (COVER) {
            const COVER_REACTION = new CustomEvent('coverR', {
                bubbles: true,
                detail: {
                    state: _state,
                }
            });
            COVER.dispatchEvent(COVER_REACTION);
        }
    }, [_state])

    if (_data) {
        //console.log(_data)
        if (_data.length === 0) {
            return null
        }
        return (
            <article>
                <h2>Regulatory Interactions</h2>
                <div style={{marginBottom: "2%"}} >
                    <p>View Options:</p>
                    <select value={_view} onChange={(event) => { set_view(event.target.value) }}>
                        <option value="table">Summary information</option>
                        <option value="full info">Full information</option>
                    </select>
                </div>
                <div>
                {
                    SwitchView(_view,_data,display_ri)
                }
                </div>
                
            </article>
        )
    }

    return <GetRegulatoryInteractions
        id_regulon={id_regulon}
        status={state => { set_state(state) }}
        resoultsData={(data) => { set_data(data) }}
    />
}

function SwitchView(view,_data,display_ri) {

    switch (view) {
        case "full info":
            return(
                <div>
                    {
                    _data.map(ri => {
                        return <RegulatotyInteraction ri={ri} display_ri={display_ri} />
                    })
                }
                </div>
            )
        default:
            return(
                <div>
                    <Table data={_data} />
                </div>
            )
    }
    
}
