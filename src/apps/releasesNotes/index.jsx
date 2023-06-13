import { useGetReleasesVersions } from "../../components/webservices/getDatabaseInfo";
import { useParams } from 'react-router-dom';
import { Menu } from "./menu";
import Release from "./release";

function ReleaseNotes() {
    let { releaseInfo } = useParams();
    // eslint-disable-next-line no-unused-vars
    const { releases, loading, error } = useGetReleasesVersions()
    const query = new URLSearchParams(releaseInfo);
    let version = query.get('version')
    let date = query.get('date')
    console.log(version, date);
    let release;
    if (!version && date && releases) {
        release = releases.find(release => release.releaseDate === date)
        version = undefined
        date = release.releaseDate
    } else {
        if (!releaseInfo && releases) {
            version = releases[0].regulonDBVersion
            date = releases[0].releaseDate
            release = releases[0]
        } else {
            if (version && releases) {
                release = releases.find(release => release.regulonDBVersion === version)
                date = release.releaseDate
            }
        }
    }

    //console.log(release);

    return (
        <div >
            <div>
                {releases && (
                    <Menu releases={releases} version={version} date={date} >
                        {release && (
                            <Release release={release} />
                        )}
                    </Menu>
                )}
            </div>
            <div>

            </div>
        </div>
    );
}


export default ReleaseNotes;