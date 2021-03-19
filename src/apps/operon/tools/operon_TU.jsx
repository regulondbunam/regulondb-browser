import React from 'react'
import {TUdescription} from './tu/TU_description'
import {TUgenes} from './tu/TU_genes'
import {TUpromoter} from './tu/TU_promoter'

export const operon_TU = ({
    id,
    idOperon,
    conf,
    name,
}) => {
    const conf_description = conf?.tu_description
    const conf_genes = conf?.tu_genes
    const conf_promoter = conf?.tu_promoter

    if(idOperon){
        return (
            <article>
                <h2>{conf_description?.title}</h2>
                <p dangerouslySetInnerHTML={{__html: conf_description?.description}} />
                <TUdescription idTU={id} />
                <h2>{conf_genes?.title}</h2>
                <p dangerouslySetInnerHTML={{__html: conf_genes?.description}} />
                <TUgenes idTU={id}/>
                <h2>{conf_promoter?.title}</h2>
                <p dangerouslySetInnerHTML={{__html: conf_promoter?.description}} />
                <TUpromoter idTU={id}/>
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
