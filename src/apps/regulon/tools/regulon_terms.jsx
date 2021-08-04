import React, { useState, useEffect } from 'react'
import GetTerms from '../webServices/regulon/terms'
import { Multifun } from './terms/multifun'
import { GeneOntology } from './terms/geneOntology'
export default function Terms({ id_regulon, conf }) {

    const [_data, set_data] = useState()
    const [_state, set_state] = useState()

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
        console.log(_data)
        return (
            <div>
                <h3>Terms</h3>
                {
                    _data?.multifun
                        ? Multifun(_data?.multifun)
                        : null
                }
                {
                    _data?.geneOntology
                    ? GeneOntology(_data?.geneOntology)
                    :null
                }
            </div>
        )
    }


    return <GetTerms id_regulon={id_regulon} status={(state) => { set_state(state) }} resoultsData={(data) => { set_data(data) }} />
}