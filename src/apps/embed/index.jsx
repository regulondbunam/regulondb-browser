import { useParams } from "react-router-dom";
import DrawingTracesInterface from "../dtt";
import { HtParameters } from "../ht/HighThroughput";

function Embed () {

    // eslint-disable-next-line no-unused-vars
    const { application, parameters, parameterA, parameterB, parameterC} = useParams()
    let params
    switch (application) {
        case "dtt":
            params = new URLSearchParams(parameters);
            return (
                <DrawingTracesInterface params={params} embed={true} />
            );
        case "ht":
            return <HtParameters site={parameters} datasetType={parameterA} info={parameterB} isEmbed />
        default:
            return (
                <div>application no embed permission</div>
            );
    }
    
}
 
export default Embed;