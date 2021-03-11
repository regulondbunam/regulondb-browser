import React from 'react'

export const operon_TU = ({
    idOperon,
    conf,
    name,
}) => {
    console.log(conf)
    if(idOperon){
        return (
            <article>
                <h2>{name}</h2>
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
