import React from 'react'
import { Cover} from "../../../components/ui-components/ui_components";


export const Title = ({title = "",state}) => {
    return (
        <div>
            <Cover state={state}>
                {state?"operon":""}
                    <h1>{title}</h1>
            </Cover>
        </div>
    )
}

export default Title
