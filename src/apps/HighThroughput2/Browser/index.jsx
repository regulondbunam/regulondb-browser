import React, { useState } from 'react'
import { Cover } from '../../../components/ui-components'

export default function Browser({datasetType}) {
    const [dir, setDir] = useState(()=>{
        return "/ "+datasetType
    })
  return (
    <div>
        <Cover>
        <h1>{`High Throughput Collection ${dir}`}</h1>
        </Cover>
        <div>
            tree
        </div>
        <div>
            table
        </div>
    </div>
  )
}
