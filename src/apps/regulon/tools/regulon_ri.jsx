import React,{useState, useEffect} from 'react'
import GetRegulatoryInteractions from '../webServices/regulon/regulatoryInteractions'
import { RegulatotyInteraction } from './regulatoryInteraction/regulatotyInteraction'

export default function RInteractions({id_regulon}) {

    const [_data, set_data] = useState()
    const [_state, set_state] = useState()

    useEffect(() => {
        const COVER = document.getElementById("div_cover_regulon_01")
        if(COVER){
            const COVER_REACTION = new CustomEvent('coverR',{
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
        if(_data.length === 0) {
            return null
        }
        return(
            <article>
                <h2>Regulatory Interactions</h2>
                {
                    _data.map(ri=>{
                        return <RegulatotyInteraction ri={ri} />
                    })
                }
            </article>
        )
    }

    return <GetRegulatoryInteractions 
            id_regulon={id_regulon}
            status={state=>{set_state(state)}}
            resoultsData={(data)=>{set_data(data)}}
            />
}
