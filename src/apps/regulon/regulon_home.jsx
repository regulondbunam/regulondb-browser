import React,{useEffect, useState} from 'react'
import GetAllRegulon from './webServices/getAllRegulon/getAllRegulon'
import {IntelligentTable} from "../../components/ui-components/ui_components"
import {formatData} from './components/regulon_formatDataHomeTable'
import {useHistory} from "react-router-dom";

/**
 * 
 * resoultsFound = () => { },
    resoultsData = () => { },
    status = () => { }
 */
export function Home({conf}) {
    const [_data, set_data] = useState()
    const [_dataTable, set_dataTable] = useState()
    const [_found, set_found] = useState()
    const [_state, set_state] = useState("done")
    // eslint-disable-next-line no-unused-vars
    const [_title, set_title] = useState(conf?.title);
    let history = useHistory();

    

    useEffect(() => {
        function go(id) {
            history.push(`/regulon/${id}`)
        }

        if(_data){
            set_dataTable(formatData(_data,go))
        }
        const COVER = document.getElementById("div_cover_regulon_01")
        if(COVER){
            const COVER_REACTION = new CustomEvent('coverR',{
                bubbles: true,
                detail: { 
                    state: _state,
                    title: _title,
                    isInfo: false
                }
            });
            COVER.dispatchEvent(COVER_REACTION);
        }
    },[set_dataTable,_data,_state,_title, history])

    if(_data){
        return(
            <article>
                <br/>
                <div dangerouslySetInnerHTML={{__html: conf?.description}} />
                <p>{_found} Regulon </p>
                <br/>
                <IntelligentTable data={_dataTable} />
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