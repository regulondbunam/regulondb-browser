import { useQuery } from "@apollo/client";
import { query_getAllGenes } from "./queries";


export function useGetAllGenes() {
    const { loading, error, data } = useQuery(query_getAllGenes);
    let geneList = []
    try {
        if (data) {
            if(data.getObjectList){
              geneList = data.getObjectList
            }
        }
    } catch (error) {
        console.error("assign geneData value:", error);
        console.log("query coexpression getObjectList", query_getAllGenes);
    }
    if (error) {
        console.error("query getGeneBy: ", error);
        console.log("query coexpression getObjectList", query_getAllGenes);
    }
    return {geneList, loading, error}
}