import { useGetReleasesVersions } from "../../components/webservices/getDatabaseInfo";
import { useParams } from 'react-router-dom';
import { Menu } from "./menu";
import Release from "./release";

function ReleaseNotes() {
    let { releaseInfo } = useParams();
    const { releases, loading, error } = useGetReleasesVersions()
    const query = new URLSearchParams(releaseInfo);
    let version = query.get('version')
    let date = query.get('date')
    console.log(version, date);
    let release;
    if (!version && date) {
        release = releases.find(release => release.releaseDate === date)
        version = undefined
        date = release.releaseDate
    } else {
        if (!version) {
            if (releases) {
                version = releases[0].regulonDBVersion
                date = releases[0].releaseDate
            }
        } else {
            if (version) {
                release = releases.find(release => release.regulonDBVersion === version)
                date = release.releaseDate
            }
        }
    }

    console.log(release);

    return (
        <div >
            <div>
                {releases && (
                    <Menu releases={releases} version={version} date={date} >
                        <Release release={release} />
                    </Menu>
                )}
            </div>
            <div>

            </div>
        </div>
    );
}


export default ReleaseNotes;