import React from 'react';
import {
    useParams
  } from "react-router-dom";

const GeneSearch = ({
    idGene
}) => {
    let idGene = useParams().id;
    console.log(idGene)

    return ( 
        <>
        {idGene}
        </>
     );
}
 
export default GeneSearch;