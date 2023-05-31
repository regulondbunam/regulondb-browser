import { useGetReleasesVersions } from "../../components/webservices/getDatabaseInfo";

function ReleaseNotes() {
    const {releasesVersion, loading, error} = useGetReleasesVersions()
    return ( 
        <div></div>
     );
}

export default ReleaseNotes;