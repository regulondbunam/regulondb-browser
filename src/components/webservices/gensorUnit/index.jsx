import { useQuery } from "@apollo/client";
import { query_getAllGUs } from "./queries";

export function useGetAllGus() {
    const { data, loading, error } = useQuery(query_getAllGUs)
    let gusData = []
    try {
        if (data) {
            if(data.getAllGUs.data){
              gusData = data.getAllGUs.data
            }
        }
    } catch (error) {
        console.error("assign geneData value:", error);
        console.log("query getGeneBySearch", query_getAllGUs);
    }
    if (error) {
        console.error("query getGeneBy: ", error);
        console.log("query getGeneBySearch", query_getAllGUs);
    }
    return { gusData, loading, error }
}
