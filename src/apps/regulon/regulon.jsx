import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import Title from "./components/regulon_title"
import {Home} from "./regulon_home"
import ValidateID from './webServices/regulon/validate'
import CONF from "./conf/regulon.conf.json"
import Info from './regulon_info';

export default function Regulon() {
    const id = useParams().id;
    return(
        <>
            <Title/>
            {
                id ? <Validate id_regulon={id} /> : <Home conf={CONF?.pages?.regulon_main} />
            }
        </>
    )
}

function Validate({id_regulon}) {
    const [_state, set_state] = useState()
    const [_data, set_data] = useState()
    const [_title, set_title] = useState("Regulon")

    useEffect(() => {
        switch (_state) {
            case 'error':
                set_title("Error :(")
            break;
            case 'not found':
                set_title(`not found ID:${id_regulon}`)
            break
            case 'loading':
                set_title(`Searching information by:${id_regulon}`)
            break;
            case 'done':
                if(_data){
                    //console.log(_data)
                    set_title(_data?.transcriptionFactor?.name)
                }
            break;
            default:
                set_title("... =]")
            break;
        }
        const COVER = document.getElementById("div_cover_regulon_01")
        if(COVER){
            const COVER_REACTION = new CustomEvent('coverR',{
                bubbles: true,
                detail: { 
                    state: _state,
                    title: _title,
                    isInfo: true,
                    data: _data
                }
            });
            COVER.dispatchEvent(COVER_REACTION);
        }
    }, [_state,_title,_data,id_regulon])

    if(_data){
        return(
            <Info id_regulon={id_regulon} conf={CONF.pages?.regulon_info} />
        )
    }
    return <ValidateID 
                id_regulon={id_regulon} 
                status={(state)=>{set_state(state)}}
                resoultsData={(data)=>{set_data(data)}}
            />
}