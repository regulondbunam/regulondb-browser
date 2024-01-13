import { useQuery, useLazyQuery } from "@apollo/client";
import { query_GetGoTerms, query_GetSubclassesOfTermId } from "./queries";
import { DataVerifier } from "../../../components/ui-components";

export function useGetGoTerms(){
    const {data, loading, error} = useQuery(query_GetGoTerms)
    let goTerms
    if (data && !error) {
        if (DataVerifier.isValidArray(data.getGoTerms)) {
            goTerms = data.getGoTerms
        }
    }
    return {goTerms, loading, error}
}