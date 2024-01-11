import { useQuery, useLazyQuery } from "@apollo/client";
import { query_GetGoTerms } from "./queries";

export function useGetGoTerms(){
    const {data, loading, error} = useQuery(query_GetGoTerms)
    
}