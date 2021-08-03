import React, {useState, useEffect} from 'react'
import GetRegulates from '../webServices/regulon/regulates'
import Terms from './regulon_terms'

export default function Regulon({id_regulon, conf}) {

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
        console.log(id_regulon)
        return(
            <article>
                <h3>Regulates</h3>
                <pre>
                    {
                        JSON.stringify(_data,null, 2)
                    }
                </pre>
                <Terms id_regulon={id_regulon} />
            </article>
        )
    }


    return <GetRegulates id_regulon={id_regulon} status={(state)=>{set_state(state)}} resoultsData={(data)=>{set_data(data)}} />
}
