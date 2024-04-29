import { getCellValue, REDUCER_TYPES, FILTER } from "../../../static"

export function textFilter(filterValue, row, columnLabel) {
    const cellValue = getCellValue(row, columnLabel)
    if (cellValue) {
        return cellValue.toLowerCase().includes(filterValue.toLowerCase())
    }
    return false
}

export function setTextFilter(filterValue, filterIndex, logicConnector = FILTER.LOGIC_CONNECTOR.OR, column, columnIndex, state, dispatch, tableId) {
    let newData = []
    let keyRowsDeleted = new Set()
    let keyRowsMatch = new Set()
    const filterKey = "textFilter_" + filterIndex + "_" + column.key

    Object.keys(state.data).forEach(key=>{
        let row = state.data[key]
        if (textFilter(filterValue, row, column.label)) {
            keyRowsMatch.add(row["_properties" + tableId].key)
        } else {
            keyRowsDeleted.add(row["_properties" + tableId].key)
        }
    })

    state.currentData.forEach(row => {
        if([...keyRowsMatch].find(key=>key===row["_properties" + tableId].key)){
            newData.push(row)
        }
    });

    dispatch({
        type: REDUCER_TYPES.setFilter,
        isOnlyContent: true,
        newData: newData,
        columnIndex: columnIndex,
        columnLabel: column.label,
        filterIndex: filterIndex,
        filterKey: filterKey,
        filterType: FILTER.TYPES.TEXT,
        filterLogicConnector: logicConnector,
        value: filterValue,
        keyRowsDeleted: keyRowsDeleted
    })
}