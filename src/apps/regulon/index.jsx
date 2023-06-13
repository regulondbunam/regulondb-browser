import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Title, { UpdateTitle } from "./Title";
import Home from "./home";
import Details from "./details";
import WebServices from "../../components/webservices/WebServices";
import { useGetRegulonData } from "../../components/webservices";


function Regulon() {
    
    let { regulonId } = useParams();
    const { regulonData: regulons } = useGetRegulonData(regulonId)
    
   if(regulons){
    const regulonData = regulons[0]
    //console.log(regulonData);
    return (
        <>
          <Title title="Regulon" />
          <Details regulonData={regulonData} />
        </>
    )
   }else{
    return (
        <>
        Home
        </>
    )
   }
}

export default Regulon;