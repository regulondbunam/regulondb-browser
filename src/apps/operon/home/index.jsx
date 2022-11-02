import React, {useEffect} from 'react';
import Operon from "./Operon"
import {UpdateTitle} from "../Title"

function Home() {
    
    useEffect(() => {
        UpdateTitle({ title: "Operon", operonToken: undefined });
    })

    return ( 
        <article id="operon_home">
            <Operon keyword="RDBECOLIOP" />
        </article>
     );
}

export default Home;