import React, { useState, useEffect } from 'react'
import { Cover } from "../../../components/ui-components/ui_components";
//import Drop from "./drop_crossref";

export const SigmulonTitle = ({ sigmulonId }) => {
    const [_state, set_state] = useState();
    const [_title, set_title] = useState("Sigmulon");
    //const [_data, set_data] = useState();

    let ID_COVER = "cover_sigmulon_context"
    useEffect(() => {
        const cover = document.getElementById(ID_COVER)
        if (cover) {
            cover.addEventListener('coverSigmulon', function (e) {
                //console.log(`state`, e.detail)
                if (e.detail.state) {
                    set_state(e.detail.state)
                }
                if (e.detail.title) {
                    set_title(e.detail.title)
                }
                //set_data(e.detail.data)
            }, false);
        }
    }, [ID_COVER])
    //console.log(_data)
    //console.log(_isHome)
    return (
        <div id={ID_COVER}>
            <Cover id="component_cover_sigmulon_01" state={_state}>
                <h1 id="h1_cover_sigmulon_01" style={{ margin: "0px 0px 0px 0px" }} >{_title}</h1>
            </Cover>
        </div>
    )
}

export default SigmulonTitle

/**
 *
 */