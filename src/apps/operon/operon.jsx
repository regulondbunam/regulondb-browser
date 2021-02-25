import React from 'react'
import { useParams } from "react-router-dom";
import { Cover } from "../../components/ui-components/ui_components";
import Home from "./operon_home"
import Info from "./operon_info"
import conf from './conf/operon.conf.json'

const Operon = () => {
    const id = useParams().id;
    //const site = useParams().site;

    if(id){
        return <Info id={id} />
    }else{
        return (
            <div>
                <Cover>
                    <h1>{conf.title}</h1>
                </Cover>
                <article>
                    <Home conf={conf} />
                </article>
            </div>
        )
    }
    
}

export default Operon