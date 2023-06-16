import { useParams } from "react-router-dom";
import Title from "./Title";
import Details from "./details";
import { useGetRegulonData } from "../../components/webservices";
import Home from "./home";

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
        <Title title="Regulon" />
        <Home />
        </>
    )
   }
}

export default Regulon;