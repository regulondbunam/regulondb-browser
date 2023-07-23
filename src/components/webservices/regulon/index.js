//import regulonData from "./dataTest.json"
import { useQuery } from "@apollo/client";
import {query_GET_REGULON_BY, query_GET_ALL_REGULON} from "./query"

export function useGetRegulonBySearch({search}) {
    const {data, error, loading} = useQuery(query_GET_REGULON_BY, {
        variables:{
            "search": search
        }
    })
    let regulonsData
    if(data){
        try {
            regulonsData = data.getRegulonBy.data
        } catch (error) {
            console.error("assign regulonData error");
        }
    }
    if (error) {
        console.error("useQuery query_GET_REGULON_BY Error:",error);
        console.log("query: ",query_GET_REGULON_BY);
    }
    return {regulonsData, error, loading}
}

export function useGetRegulonData(id) {
    //console.log(query_GET_REGULON_BY);
    
    const {data, error, loading} = useQuery(query_GET_REGULON_BY, {
        variables:{
            "advancedSearch": id+"[_id]"
        }
    })
    let regulonData
    if(data){
        try {
            //console.log(data);
            regulonData = data.getRegulonBy.data[0]
        } catch (error) {
            console.error("assign regulonData error");
        }
    }
    if (error) {
        console.error("useQuery query_GET_REGULON_BY Error:",error);
        console.log("query: ",query_GET_REGULON_BY);
    }
    return {regulonData, error, loading}
}

export function useGetAllRegulon(){
    const {data,error,loading} = useQuery(query_GET_ALL_REGULON)
    let allRegulonData
    try {
        allRegulonData = data.getAllRegulon.data
    } catch (error) {
        console.error("assign allRegulonData error");
    }
    if (error) {
        console.error("useQuery query_GET_ALL_REGULON Error:",error);
        console.log("query: ",query_GET_ALL_REGULON);
    }
    return {allRegulonData, error, loading}
}