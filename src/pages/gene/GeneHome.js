import React from 'react';
import Cover from './ownComponents/Cover'
import GeneSearch from './GeneSearch'
import {
    useParams
  } from "react-router-dom";

const GeneHome = () => {
    const idGene = useParams().id;
    const site = useParams().site;
    const section = useParams().section;
    console.log(idGene,"/",site,"/",section)
    if(idGene !== undefined){
      return <GeneSearch idGene={idGene} site={site} section={section} />
    }
    return ( 
        <>
        {Cover()}
        </>  
     );
}
 
export default GeneHome;