import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useGetGenesBy } from "../../components/webservices";
import Title, { UpdateTitle } from "./components/Title";
import Information from './information';
import Home from "./Home";


export default function Gene() {
  let { geneId } = useParams();
  if(geneId.split("_").length>1){
    geneId = geneId.split("_")[0]
  }
  if(geneId){
    return <GeneDescription geneId={geneId} />
  }
  return <Home />
}

function GeneDescription({geneId}){

  const [title, setTitle] = React.useState("gene");
  const {geneData, loading, error} = useGetGenesBy({_id: geneId})
  console.log(geneData);
  useEffect(() => {
    if (loading) {
      UpdateTitle({state: "loading"})
      setTitle("Loading gene data...")
    }
    if (geneData && !error) {
      UpdateTitle({state: "done"})     
    }
    if (geneData === null) {
      UpdateTitle({state:"error"})
      setTitle(`Sorry, Gene:${geneId} don't found`)
    }
    if(error){
      UpdateTitle({state:"error"})
      setTitle(`Error to query ${geneId} information`)
    }
  }, [geneData, loading, error, geneId]);

  return (
    <div>
      <Title title={title} geneData={geneData} />
      {geneData && (
         <Information geneData={geneData}  />
      )}
    </div>
  )
}