import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {DataProvider} from "../../components/webservices/DataProvider";
import Details from "./Details";

function Gene() {
  const [id, setId] = useState();
  let { geneId } = useParams();

  useEffect(() => {
    console.log(id, geneId);
    if(geneId !== id ){
      if (!id) {
        setId(geneId);
      }else{
        setId(undefined);
      }
      
    }
  },[geneId, id])

  
  if (!geneId) {
    return <div>No gene id</div>;
  }
  if(id){
    return(
      <DataProvider
        datamart_name="getGenesBy"
        variables={{advancedSearch: `'${id}'[_id]`}}
        getState={(state) => {console.log(state);}}
      >
        <Details/>
      </DataProvider>
    )
  }
  return <div>Loading...</div>;
}


export default Gene;
