import { Note } from "./note"
import { Summary } from "./summary"
export default function Release({release}) {
    return(
        <div>
            <Note release={release} />
            <br />
            <Summary statistics={release.statistics} />
        </div>
    )
}