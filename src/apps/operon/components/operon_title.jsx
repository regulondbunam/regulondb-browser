import React from 'react'
import { Cover} from "../../../components/ui-components/ui_components";


export const Title = ({title = "",state,isInfo = false}) => {
    return (
        <div>
            <Cover state={state}>
                {isInfo?"operon":""}
                    <h1>{title}</h1>
            </Cover>
        </div>
    )
}

export default Title
