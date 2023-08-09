import { useParams } from "react-router-dom";
import Title from "./Title";
import { useGetRegulonData } from "../../components/webservices";
import Home from "./home";
import Document from "./document";


function Regulon() {
    let { regulonId } = useParams();
    const { regulonData: regulons, loading, error } = useGetRegulonData(regulonId)
    if (regulonId) {
        const regulonData = regulons
        let state = "", title = ""
        if (loading) {
            state = "loading"
            title = "loading... Regulon document with id " + regulonId
        }
        if (error) {
            state = "error"
            title = "... Sorry, we have an error, try again later 🥲"
        }
        if (regulonData) {
            if (regulonData === null) {
                state = "error"
                title = "Error, regulon document with id " + regulonId + " was not found. 😞"
            } else {
                state = "done"
                title = regulonData.regulator.name
            }
        }
        console.log(regulonData);
        return (
            <div>
                <Title title={title} state={state} regulator={regulonData && regulonData.regulator} />
                {regulonData && (
                    <Document regulonData={regulonData} />
                )}
            </div>
        )
    } else {
        return <Home />
    }
}

export default Regulon;