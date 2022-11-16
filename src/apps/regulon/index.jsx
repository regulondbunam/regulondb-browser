import { useState } from "react";
import { useParams } from "react-router-dom";
import Title from "./Title";
import Home from "./home";


function Regulon({regulonData}) {
    const [_regulonData, set_regulonData] = useState(regulonData);
    let { regulonId } = useParams();
    let Body = <div></div>
    if(!_regulonData && !regulonId){
        Body = <Home/>
    }
    return ( 
        <div>
            <Title title="Regulon" />
            {Body}
        </div>
     );
}

export default Regulon;