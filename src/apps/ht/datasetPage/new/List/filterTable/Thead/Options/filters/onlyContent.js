import { REDUCER_TYPES, FILTER, getCellValue } from "../../../static"

export function onlyContentFilter(row,columnLabel){
    return getCellValue(row, columnLabel)
}

export function setOnlyContent(column,columnIndex, currentData, dispatch, tableId) {
    const filterKey = "onlyContent_"+column.key
    let newData = []
    let keyRowsDeleted = new Set()
    if (column.isOnlyContent === false) {
        currentData.forEach((row) => {
            if (onlyContentFilter(row, column.label)) {
                newData.push(row)
            }else{
                keyRowsDeleted.add(row["_properties" + tableId].key)
            }
        })
        dispatch({
            type: REDUCER_TYPES.setFilter,
            isOnlyContent: true,
            newData: newData,
            columnIndex: columnIndex,
            columnLabel: column.label,
            filterIndex: "OnlyContent",
            filterKey: filterKey,
            filterType: FILTER.TYPES.ONLY_CONTENT,
            filterLogicConnector: FILTER.LOGIC_CONNECTOR.OR,
            value: "",
            keyRowsDeleted: keyRowsDeleted
        })
    } else {
        dispatch({
            type: REDUCER_TYPES.deleteFilter,
            columnIndex: columnIndex,
            columnLabel: column.label,
            filterIndex: "OnlyContent",
            filterKey: filterKey,
            filterType: FILTER.TYPES.ONLY_CONTENT,
        })
        //deleteFilter(filterKey)
    }

    /*
        if (!column.isOnlyContent) {
            currentData.forEach((row)=>{
            if (DataVerifier.isValidString(row[column.label])) {
                rows.push(row)
            }
        })
        }else{
            rows = currentData
        }
        dispatch({ 
            type: REDUCER_TYPES.showOnlyContent, 
            newData: rows, 
            columnIndex: index,
            isOnlyContent: !column.isOnlyContent,
        })
        */
}