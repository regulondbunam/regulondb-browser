import React, {useMemo} from 'react'
import FilterTable from './filterTable'
import formatDatasetFilterTable from './formatDatasetFilterTable'

export default function Table({
    datasets,
    datasetType,
    dir = "",
    source,
    experimentType,
}) {
    const table = useMemo(() => formatDatasetFilterTable(datasets,datasetType,experimentType,source), [datasets,datasetType,experimentType,source])
    return <FilterTable columns={table.columns} data={table.data} tableName={dir} />
}
