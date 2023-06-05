import { useGetReleasesVersions } from "../../components/webservices/getDatabaseInfo";
import { useParams } from 'react-router-dom';
import { Menu } from "./menu";

function ReleaseNotes() {
    let { regulonDBVersion } = useParams();
    const { releasesVersion, loading, error } = useGetReleasesVersions()
    if (!regulonDBVersion) {
        if(releasesVersion){
            regulonDBVersion = releasesVersion[0].regulonDBVersion
        }
    }
    return (
        <div >
            <div>
                {releasesVersion && (
                    <Menu releasesVersion={releasesVersion} regulonDBVersion={regulonDBVersion} >
                         {regulonDBVersion}
                    </Menu>
                )}
            </div>
            <div>
               
            </div>
        </div>
    );
}


export default ReleaseNotes;