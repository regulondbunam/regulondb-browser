import React, { useMemo } from 'react'
import createColumns from './createColumns';
import formatData from './formatData';
import { FilterTable } from '../../../../components/ui-components';

export default function Table({fileData, evidenceOptions}) {
  console.log(evidenceOptions);
    const columnsInfo = createColumns(fileData.columnsDetails)
    const {columns,data} = formatData(fileData.content, evidenceOptions)
   
  return (
    <div>
        <FilterTable columnsInfo={columnsInfo} columns={columns} data={data} />
    </div>
  )
}
