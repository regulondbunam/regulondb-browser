import React from 'react'
import { Link } from 'react-router-dom'

export default function Regulators(regulators) {
    return (
        <div style={{ paddingLeft: '5%' }}>
            {
                regulators.map(regulator=>{
                    return (
                        <div key={`regulator_info_${regulator.id}`}>
                            <Link  to={`/regulator/${regulator.id}`} >
                        {`${regulator?.function} -- ${regulator?.name}, type ${regulator?.type}`}
                    </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}
