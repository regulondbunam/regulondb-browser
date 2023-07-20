import { useQuery } from "@apollo/client";
import { query_GET_GENE_BY } from "./queries";

export function useGetGenesBySearch({search}){
    const { data, loading, error } = useQuery(query_GET_GENE_BY, {
        variables: {search: search}
    })
    let genesData = []
    try {
        if (data) {
            if(data.getGenesBy.data){
              genesData = data.getGenesBy.data
            }
        }
    } catch (error) {
        console.error("assign geneData value:", error);
        console.log("query getGeneBySearch", query_GET_GENE_BY);
    }
    if (error) {
        console.error("query getGeneBy: ", error);
        console.log("query getGeneBySearch", query_GET_GENE_BY);
    }
    return { genesData, loading, error }
}

export function useGetGenesBy({
    _id,
    advancedSearch,
    fullMatchOnly = false,
    limit = 1,
    organismName,
    page,
    properties,
    search,
}) {
    if (_id) {
        advancedSearch = `${_id}[_id]`
    }
    const { data, loading, error } = useQuery(query_GET_GENE_BY, {
        variables: {
            advancedSearch: advancedSearch,
            fullMatchOnly: fullMatchOnly,
            limit: limit,
            organismName: organismName,
            page: page,
            properties: properties,
            search: search,
        }
    })
    let geneData
    try {
        if (data) {
            if(data.getGenesBy.data[0]){
              geneData = data.getGenesBy.data[0]  
            }else{
                geneData = null
            }
        }
    } catch (error) {
        console.error("assign geneData value:", error);
        console.log("query getGeneBy", query_GET_GENE_BY);
    }
    if (error) {
        console.error("query getGeneBy: ", error);
        console.log("query getGeneBy", query_GET_GENE_BY);
    }
    return { geneData, loading, error, getGenesBy: data?.getGenesBy }
}