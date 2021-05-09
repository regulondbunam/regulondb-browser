import React, { useState } from 'react'
import { Cover } from "../../components/ui-components/ui_components";


import Tabs from "./components/operon_tabs";
//import conf from './conf/operon.conf.json'
//const info = conf.pages.operon_info

export const Info = ({ id }) => {
    
    let title = "Operon Information";
    let nTUs = 0
    let showTabs = false
    if (id) {
        
    }
    return (
        <div>
            <Cover state="error">
                <h1>no id</h1>
            </Cover>
            <article>
                operon content
                </article>
        </div>
    )
}

export default Info

function showTitle(title, _state, _data) {
    return (
        <div>
            
        </div>
    )    
}