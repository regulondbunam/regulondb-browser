import React, {useState, useEffect} from 'react'
import GetTranscriptionFactor from '../webServices/regulon/transcriptionFactor'
import BasicInfo from './description/basic_info'

export default function Description({id_regulon, conf}) {

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

    if(_data){
        console.log(_data)
        return(
            <article>
                <h2>{conf?.title}</h2>
                <p dangerouslySetInnerHTML={{__html: conf?.description }} />
                <BasicInfo tf={_data} />
            </article>
        )
    }


    return <GetTranscriptionFactor id_regulon={id_regulon} status={(state)=>{set_state(state)}} resoultsData={(data)=>{set_data(data)}} />
}
