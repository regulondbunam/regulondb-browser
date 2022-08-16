import React, {useState} from 'react'
import AllCits from '../components/cits/Cits'
import GetAllCitations from '../webServices/citations'

export const AllCitations = ({ idOperon }) => {
    const [_state, set_state] = useState();
    const [_allCitations, set_allCitations] = useState();
    let loading = false
    switch (_state) {
        case "loading":
            loading = true
            break;
        case "error":
            return <>error...</>
        case "done":
            return <article>{AllCits(_allCitations, false, true, true)}</article>
        default:
            break
    }
    return (
        <div>
            {
                loading ? <>loading...</> : null
            }
            <GetAllCitations id_operon={idOperon}
                resoultsData={(data) => { set_allCitations(data) }}
                status={(state) => { set_state(state) }}
            />
        </div>
    )
}


//
export default AllCitations
