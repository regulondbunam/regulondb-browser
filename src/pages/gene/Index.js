import React from 'react';
import {
    useParams
  } from "react-router-dom";

const GeneHome = () => {
    const idGene = useParams().id;
    const site = useParams().site;
    const section = useParams().section;
    console.log(idGene,"/",site,"/",section)
    return ( 
        <>
        Gene
        </>
     );
}
 
export default GeneHome;