import React from 'react'
import { Link } from 'react-router-dom'

export default function RegulationOperon(operon) {
    return (
        <div style={{ paddingLeft: '5%' }}>
            <Link href={`operon/${operon?.id}`}><h4 style={{color: "#72a7c7"}}>{`Operon ${operon?.name}`}</h4></Link>
        </div>
    )
}
