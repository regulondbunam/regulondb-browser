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
                <TUdescription id_tu={id} id_operon={idOperon} conf={conf_description} />
                <TUgenes id_tu={id} id_operon={idOperon}conf={conf_genes} />
                <TUpromoter id_tu={id} id_operon={idOperon} conf={conf_promoter} />
                <TUTerminators id_tu={id} id_operon={idOperon} conf={conf_terminator} />
                <TUrBS id_tu={id} id_operon={idOperon} conf={conf_bindingsites} />
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
