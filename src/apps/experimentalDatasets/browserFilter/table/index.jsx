import React, { useMemo } from 'react'
import createColumns from './createColumns';
import formatData from './formatData';
import { FilterTable } from '../../../../components/ui-components';

export default function Table({fileData}) {
    const columnsInfo = createColumns(fileData.columnsDetails)
    const {columns,data} = useMemo(()=>{
        return formatData(fileData.content)
    },[fileData])
   
  return (
    <div>
        <FilterTable showColumnsInfo columnsInfo={columnsInfo} columns={columns} data={data} />
    </div>
  )
}
