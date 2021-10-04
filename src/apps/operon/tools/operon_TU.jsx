
import React from 'react'
import TUgraph from "./tu/TU_graph"
import {TUdescription} from './tu/TU_description'
import {TUgenes} from './tu/TU_genes'
import {TUpromoter} from './tu/TU_promoter'
import {TUTerminators} from './tu/TU_terminator'
//import {TUrBS} from './tu/TU_rBS'


export const operon_TU = ({
    id_tu,
    data_tu,
    conf,
    name,
}) => {
    const conf_description = conf?.tu_description
    const conf_genes = conf?.tu_genes
    const conf_promoter = conf?.tu_promoter
    const conf_terminator = conf?.tu_terminator
    //const conf_bindingsites = conf?.tu_bindingsites
    //console.log(data_tu)
    if(data_tu){
        return(
            <div>
                <div className="sticky">
                    <TUgraph data={data_tu} />
                </div>
                <TUdescription data_tu={data_tu} conf={conf_description} id_tu={id_tu} />
                <TUgenes data_tu={data_tu} conf={conf_genes} id_tu={id_tu} />
                <TUpromoter data_tu={data_tu} conf={conf_promoter} id_tu={id_tu} />
                <TUTerminators data_tu={data_tu} conf={conf_terminator} id_tu={id_tu} />
            </div>
        )
    }
    return (
        <div>
            no id
        </div>
    )
}

export default operon_TU

/**
 *     if(idOperon){
        return (
            <article>
                
                
                
                <TUrBS id_tu={id} id_operon={idOperon} conf={conf_bindingsites} />
            </article>
        )
    }
 */