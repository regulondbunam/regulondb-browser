import { useParams } from "react-router-dom";
import DTT from "../dtt/dtt";

function Embed () {
    const application = useParams().application;
    const parameters = useParams().parameters
    console.log(application);
    switch (application) {
        case "dtt":
            let params = new URLSearchParams(parameters);
            return (
                <DTT params={params} embed={true} />
            );
    
        default:
            return (
                <div>application no embed permission</div>
            );
    }
    
}
 
export default Embed;