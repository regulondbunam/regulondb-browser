import React, { useState, useEffect } from 'react'
import GetTerms from '../webServices/regulon/terms'
import { Multifun } from './terms/multifun'

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
            </div>
        )
    }


    return <GetTerms id_regulon={id_regulon} status={(state) => { set_state(state) }} resoultsData={(data) => { set_data(data) }} />
}



function Ontology(ontology) {
    if (!ontology) {
        return null
    }
    return (
        <table>
            <tbody>
                <tr><td>cellularComponent</td></tr>
                {
                    ontology?.cellularComponent
                        ? GeneOntologyItem(ontology?.cellularComponent)
                        : null
                }
                <tr><td>molecularFunction</td></tr>
                {
                    ontology?.molecularFunction
                        ? GeneOntologyItem(ontology?.molecularFunction)
                        : null
                }
                <tr><td>biologicalProcess</td></tr>
                {
                    ontology?.biologicalProcess
                        ? GeneOntologyItem(ontology?.biologicalProcess)
                        : null
                }
            </tbody>
        </table>
    )
}

function GeneOntologyItem(data) {
    return (
        <tr>
            <table>
                <tbody>
                    {
                        data.map(fun => {
                            let genes = ""
                            try {
                                genes = fun.genes.map(gen => {
                                    return gen?.gene_name
                                }).join(', ')
                            } catch (error) {
                            }
                            return (
                                <tr key={`multifunT_${fun.term_id}`}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>{fun.name}</td>
                                                <td>{genes}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </tr>
    )
}