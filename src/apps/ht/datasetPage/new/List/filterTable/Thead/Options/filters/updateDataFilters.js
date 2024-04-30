//import DataVerifier from "../../../../utils";
import { FILTER } from "../../../static"
import { onlyContentFilter } from "./onlyContent"
import { textFilter } from "./text";

export function updateDataFilter(data, filters = []) {
    let keys = new Set( Object.keys(data).map(rowKeys=>rowKeys))
    Object.keys(data).forEach(rowKey => {
        const row = data[rowKey]
        filters.forEach(filter=>{
            switch (filter.type) {
                case FILTER.TYPES.ONLY_CONTENT:
                    if (!onlyContentFilter(row, filter.columnLabel)) {
                        keys.delete(rowKey)
                    }
                    break;
                case FILTER.TYPES.TEXT:
                    if (!textFilter(filter.value, row, filter.columnLabel)) {
                        keys.delete(rowKey)
                    }
                    break;
                case FILTER.TYPES.SECTION:

                    break;
                case FILTER.TYPES.NUMBER:

                    break;
                default:
                    break;
            }
        })
    })
    return [...keys].map(rowKey=>data[rowKey])
}

/*
{
        columnLabel: action.columnLabel,
        key: action.filterKey,
        type: action.filterType,
        index: action.filterIndex,
        logicConnector: action.filterLogicConnector ? action.filterLogicConnector : "OR",
        value: action.value,
      }

*/