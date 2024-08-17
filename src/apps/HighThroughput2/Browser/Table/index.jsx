import React, {useMemo} from 'react'
import FilterTable from './filterTable'
import formatDatasetFilterTable from "./Formats"

export default function Table({
    datasets,
    datasetType,
    dir = "",
    source,
    experimentType,
}) {
    const table = formatDatasetFilterTable(datasets,datasetType,experimentType,source)
    
    return <FilterTable columns={table.columns} data={table.data} tableName={dir} />
}
