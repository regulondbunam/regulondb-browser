import { Card } from "../../../components/ui-components"
import { Remarkable } from 'remarkable';

export function Note({ release }) {

    let md = new Remarkable();
    md.set({
        html: true,
        breaks: true
    });

    if (!release.note) {
        return null
    }


    return (
        <Card id={"ReleaseNote"} title="Release Note" >
            <div style={{ margin: "2%" }} >
                <p><b>
                    {release.regulonDBVersion && `RegulonDB Version: ${release.regulonDBVersion} `}
                    {release.ecocycVersion && `--> Ecocyc Version: ${release.ecocycVersion}`}
                </b></p>
                {release.releaseDate && (
                    <p>Release Date: {release.releaseDate}</p>
                )}
                <p><b>Note:</b></p>
                <p dangerouslySetInnerHTML={{ __html: md.render(release.note) }} />
            </div>
            <br />
        </Card>
    )
}