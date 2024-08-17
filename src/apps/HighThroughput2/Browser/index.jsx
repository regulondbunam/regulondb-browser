import React, { useEffect, useState } from 'react'
import { Cover, DataVerifier } from '../../../components/ui-components'
import { useGetDatasets, useInitDatasetsByDatasetType } from '../WebServices'
import TreeView from './Tree'
import { useReducer } from 'react'
import Table from './Table'

function initState({
    datasetType,
    source,
    experimentType
}) {
    //set dir
    let dir = ""
    if (DataVerifier.isValidString(datasetType)) {
        dir += ` / ${datasetType}`
    }
    if (DataVerifier.isValidString(source)) {
        dir += ` / ${source}`
    }
    if (DataVerifier.isValidString(experimentType)) {
        dir += ` / ${experimentType}`
    }
    //set tree id
    let treeId = ""
    if (DataVerifier.isValidString(datasetType)) {
        treeId += `datasetType:${datasetType}`
    }
    if (DataVerifier.isValidString(source)) {
        treeId += `&source:${source}`
    }
    if (DataVerifier.isValidString(experimentType)) {
        treeId += `&experimentType:${experimentType}`
    }
    return {
        datasetType: datasetType,
        source: source,
        experimentType: experimentType,
        dir: dir,
        treeId: treeId
    }
}

function reducer(state, action) {
    return state
}

export default function Browser({
    datasetType,
    source,
    experimentType
}) {

    const [state, dispatch] = useReducer(reducer, { datasetType, source, experimentType }, initState)
    const [datasets, setDatasets] = useState([])
    const [getDatasetsByDatasetType, { loading, error }] = useGetDatasets()
    const { loading: initLoading, error: initerror } = useInitDatasetsByDatasetType(datasetType,setDatasets);


    if (error) {
        return <Cover state={"error"}><h1>Error to load datasets</h1></Cover>
    }
    console.log(datasets);
    return (
        <div>
            <Cover state={loading ? "loading" : "done"}>
                <h1>{`High Throughput Collection ${state.dir}`}</h1>
            </Cover>
            <div style={{ display: "flex" }} >
                <div style={{ minWidth: "200px", overflow: "auto" }} >
                    <TreeView />
                </div>
                <div style={{ width: "100%" }} >
                    <Table dir={state.dir} datasets={datasets} datasetType={state.datasetType} source={state.source} experimentType={state.experimentType} />
                </div>
            </div>

        </div>
    )
}
