import React,{useEffect, useState} from 'react'
//import {formatData} from './components/regulon_formatDataHomeTable'
import {useNavigate} from "react-router-dom";


export function Home({conf}) {
    const [_state, set_state] = useState("done")

    let navigate = useNavigate();
    

    useEffect(() => {

        if(_data){
            set_dataTable(formatData(_data,go))
        }
        const COVER = document.getElementById("div_cover_regulon_01")
        if(COVER){
            const COVER_REACTION = new CustomEvent('coverR',{
                bubbles: true,
                detail: { 
                    state: _state,
                    title: conf?.title,
                    isInfo: false
                }
            });
            COVER.dispatchEvent(COVER_REACTION);
        }
    },[set_dataTable,_data,_state,_title, navigate])

    if(_data){
        return(
            <article>
                <br/>
                <div dangerouslySetInnerHTML={{__html: conf?.description}} />
                <p>{_found} Regulon </p>
                <br/>
                table
            </article>
        )
    }

    return(
        <div>
            <GetAllRegulon
                limit={0}
                resoultsFound={(found)=>{set_found(found)}}
                resoultsData={(data)=>{set_data(data)}}
                status={(state)=>{set_state(state)}}
            />
        </div>
    )
    
}