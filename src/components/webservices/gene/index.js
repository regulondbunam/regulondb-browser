import { useQuery } from "@apollo/client";
import { query_GET_GENE_BY } from "./queries";

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
            geneData = data.getGenesBy.data[0]
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