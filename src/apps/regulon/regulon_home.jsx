import React,{useEffect, useState} from 'react'

export function Home() {
    const [_title, set_title] = useState("Regulon");
    const [state, setState] = useState("Done");

    useEffect(() => {
        const COVER = document.getElementById("div_cover_regulon_01")
        if(COVER){
            const COVER_REACTION = new CustomEvent('coverR',{
                bubbles: true,
                detail: { 
                    state: state,
                    title: _title,
                    isInfo: false
                }
            });
            COVER.dispatchEvent(COVER_REACTION);
        }
    }, [])

    return(
        <div>
            HOME
        </div>
    )
    
}