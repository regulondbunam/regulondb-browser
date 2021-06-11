import React from 'react'
import {TUdescription} from './tu/TU_description'
import {TUgenes} from './tu/TU_genes'
import {TUpromoter} from './tu/TU_promoter'
import {TUTerminators} from './tu/TU_terminator'
import {TUrBS} from './tu/TU_rBS'

export const operon_TU = ({
    id,
    idOperon,
    conf,
    name,
}) => {
    const conf_description = conf?.tu_description
    const conf_genes = conf?.tu_genes
    const conf_promoter = conf?.tu_promoter
    const conf_terminator = conf?.tu_terminator
    const conf_bindingsites = conf?.tu_bindingsites

    if(idOperon){
        return (
            <article>
                <h2>{conf_description?.title}</h2>
                <p style={{marginLeft: "5%"}} dangerouslySetInnerHTML={{__html: conf_description?.description}} />
                <TUdescription id_tu={id} id_operon={idOperon} />
                <h2>{conf_genes?.title}</h2>
                <p style={{marginLeft: "5%"}} dangerouslySetInnerHTML={{__html: conf_genes?.description}} />
                <TUgenes id_tu={id} id_operon={idOperon}/>
                <h2>{conf_promoter?.title}</h2>
                <p style={{marginLeft: "5%"}} dangerouslySetInnerHTML={{__html: conf_promoter?.description}} />
                <TUpromoter id_tu={id} id_operon={idOperon}/>
                <h2>{conf_terminator?.title}</h2>
                <p style={{marginLeft: "5%"}} dangerouslySetInnerHTML={{__html: conf_terminator?.description}} />
                <TUTerminators id_tu={id} id_operon={idOperon} />
                <h2>{conf_bindingsites?.title}</h2>
                <p style={{marginLeft: "5%"}} dangerouslySetInnerHTML={{__html: conf_bindingsites?.description}} />
                <TUrBS id_tu={id} id_operon={idOperon} />
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
