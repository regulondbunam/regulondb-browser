import RegulatoryNetwork from '../../../components/regulatoryNetwork/RegulatoryNetwork'
import React from 'react'

export default function RNetwork({ id_regulon, display_ri = true }) {
    return (
        <div>
            <RegulatoryNetwork id_regulon={id_regulon} />
        </div>
    )
}
