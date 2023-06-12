import { Note } from "./note"
export default function Release({release}) {
    return(
        <div>
            <Note release={release} />
        </div>
    )
}