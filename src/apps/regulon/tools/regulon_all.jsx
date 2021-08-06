import React from 'react'
import RegulatotyInteraction from './regulon_ri'
import Description from './regulon_description'
import Regulon from './regulon_regulon'

export default function All({id_regulon}) {
    return (
        <div>
            <Description id_regulon={id_regulon}/>
            <RegulatotyInteraction id_regulon={id_regulon} display_ri={false}/>
            <Regulon id_regulon={id_regulon}/>
        </div>
    )
}
