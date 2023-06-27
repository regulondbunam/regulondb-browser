import { useParams } from "react-router-dom";
import Title from "./Title";
import Details from "./details";
import { useGetRegulonData } from "../../components/webservices";
import Home from "./home";
import { Cover } from "../../components/ui-components";


function Regulon() {
    
    let { regulonId } = useParams();
    const { regulonData: regulons, loading } = useGetRegulonData(regulonId)
    
   if(regulonId){
    
    const regulonData = regulons

    if (loading) {
        return "loading"
    }

    if(regulonData){
        //console.log(regulonData);
        return (
            <>
              <Title title={"Regulon "+regulonData.regulator.name} />
              <Details regulonData={regulonData} />
            </>
        )
    }
   }else{
    return (
        <>
        <Cover >
            <h1>Regulons</h1>
        </Cover>
        <Home />
        </>
    )
   }

   return null
}

export default Regulon;