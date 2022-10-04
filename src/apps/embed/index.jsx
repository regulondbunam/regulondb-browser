import { useParams } from "react-router-dom";
import DrawingTracesInterface from "../dtt";

function Embed () {
    const application = useParams().application;
    const parameters = useParams().parameters
    console.log(application);
    switch (application) {
        case "dtt":
            let params = new URLSearchParams(parameters);
            return (
                <DrawingTracesInterface params={params} embed={true} />
            );
    
        default:
            return (
                <div>application no embed permission</div>
            );
    }
    
}
 
export default Embed;