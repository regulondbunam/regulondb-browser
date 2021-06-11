import React, {useState, useEffect} from 'react'
import { Cover} from "../../../components/ui-components/ui_components";


export const Title = () => {
    const [_isInfo, set_isInfo] = useState(false);
    const [_state, set_state] = useState();
    const [_title, set_title] = useState("");
    useEffect(() => {
        const cover = document.getElementById("div_cover_operon_01")
        if(cover){
            cover.addEventListener('coverR', function (e) { 
                console.log(`state`, e.detail)
                set_state(e.detail.state)
                set_title(e.detail.title)
                if(e.detail.isInfo){
                    set_isInfo(true)
                }
             }, false);
        }
    }, [])
    return (
        <div id={"div_cover_operon_01"}>
            <Cover id="component_cover_operon_01" state={_state}>
                {_isInfo?"operon":""}
                    <h1 id="cover_operon_01" >{_title}</h1>
            </Cover>
        </div>
    )
}

export default Title
