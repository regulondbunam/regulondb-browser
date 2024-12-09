import React from 'react'
import Dandadan from './Dandadan'
import CoverDefault from '../cover/Defult'

export default function LoadBody({ theme }) {
    switch (theme) {
        case 'anime':
            return <Dandadan />
        default:
            return (
                <CoverDefault />
            )
    }

}
