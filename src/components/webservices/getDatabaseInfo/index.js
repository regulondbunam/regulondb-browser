import { useQuery } from "@apollo/client";
import { query_GetReleasesVersions } from "./queries";

export function useGetReleasesVersions() {
    let {data, error, loading} = useQuery(query_GetReleasesVersions) 
    let releasesVersion = data?.getDatabaseInfo
    return {data, releasesVersion, error, loading}
}