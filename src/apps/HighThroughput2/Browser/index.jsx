import React, {useReducer} from 'react'
import { Cover, DataVerifier } from '../../../components/ui-components'
import TreeView from './Tree'
import Table from './Table'
import { DISPATCH_TYPE } from './static';

function setDir(
    datasetType,
    source,
    experimentType
) {
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
    return dir
}

function initState({
    datasetType,
    source,
    experimentType
}) {
    //set dir
    const dir = setDir(datasetType, source, experimentType)
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
    switch (action.type) {
        case DISPATCH_TYPE.UPDATE_TREE:
            const dir = setDir(action.datasetType, action.source, action.experimentType)
            return {
                ...state,
                dir: dir,
                datasetType: action.datasetType,
                source: action.source,
                experimentType: action.experimentType
            }
        default:
            break;
    }
    return state
}

export default function Browser({
    datasetType,
    source,
    experimentType
}) {

    const [state, dispatch] = useReducer(reducer, { datasetType, source, experimentType }, initState)


    const handleUpdateDatasets = (newDatasetType, newSource, newExperimentType) => {
        dispatch({
            type: DISPATCH_TYPE.UPDATE_TREE,
            datasetType: newDatasetType,
            source: newSource,
            experimentType: newExperimentType
        })
    }

    return (
        <div>
            <Cover>
                <h1>{`High Throughput Collection ${state.dir}`}</h1>
            </Cover>
            <div style={{ display: "flex" }} >
                <div style={{ minWidth: "200px", overflow: "auto" }} >
                    <TreeView updateDataset={handleUpdateDatasets} />
                </div>

                <div style={{ width: "100%" }} >
                    <Table dir={state.dir} datasetType={state.datasetType} source={state.source} experimentType={state.experimentType} />
                </div>

            </div>

        </div>
    )
}