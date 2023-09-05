import React from 'react'
import { useGetGuById } from '../../../components/webservices'
import { Cover } from '../../../components/ui-components'

export default function GuInfo({guId}) {
const {guData, loading, /*error*/} = useGetGuById(guId)

if(loading){
    return <>loading</>
}
  return (
    <div>GuInfo</div>
  )
}
