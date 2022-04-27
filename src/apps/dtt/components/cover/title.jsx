import React, { useState, useEffect } from 'react'
import { Cover } from "./cover";


export const Title = () => {
    const id = "title-cover-dtt"
    const [_state, set_state] = useState();
    const [_title, set_title] = useState("Drawing Traces Tool");

    useEffect(() => {
        const cover = document.getElementById(id)
        if (cover) {
            cover.addEventListener('coverR', function (e) {
                //console.log(`state`, e.detail)
                if (e.detail.state) {
                    set_state(e.detail.state)
                }
                if (e.detail.title) {
                    set_title(e.detail.title)
                }
            }, false);
        }
    }, [])
    //console.log(_isInfo)
    return (
        <div id={id}>
            <Cover id="component_cover_dtt_01" state={_state}>
                <h1 id="cover_dtt_01" style={{margin: "0px 0px 0px 0px"}} >{_title}</h1>
            </Cover>
        </div>
    )
}

export default Title