import regulonData from "./dataTest.json"

export function useGetRegulonData(id) {
    if(!id){
        return{regulonData: undefined}
    }
    return {regulonData}
}