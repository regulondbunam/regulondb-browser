import React, {useEffect, useState} from 'react'
import GetAllCitations from '../webServices/regulon/allCitations'
import AllCitations from '../../../components/cits/Cits'

export default function Citations({id_regulon}) {

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
                <h2>Citations</h2>
               {
                   AllCitations(_data, false)
               }
            </article>
        )
    }
    return <GetAllCitations 
            id_regulon={id_regulon}
            resoultsData={(data)=>{set_data(data)}} 
            status={(state)=>{set_state(state)}}
            />
}
