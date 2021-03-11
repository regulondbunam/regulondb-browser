import React from 'react'
import {TUdescription} from './tu/TU_description'

export const operon_TU = ({
    idOperon,
    conf,
    name,
}) => {
    const conf_description = conf?.tu_description
    //console.log(conf)
    if(idOperon){
        return (
            <article>
                <h2>{`${conf_description.title} ${name}`}</h2>
                <TUdescription idOperon={idOperon} />
            </article>
        )
    }
    return (
        <div>
            no id
        </div>
    )
}

export default operon_TU
