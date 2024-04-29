import DataVerifier from "../../../../utils";
import { FILTER } from "../../../static"
import { onlyContentFilter } from "./onlyContent"
import { textFilter } from "./text";

export function deleteFilter(filterIndex, state, columnLabel) {

    let newFilters = [];
    let newData = [...state.currentData];


    let deleteFilter = state.filters[columnLabel][filterIndex]
    if(!deleteFilter){
        return { newFilters: state.filters, newData: state.currentData }
    }
    console.log(deleteFilter);
    [...deleteFilter.keyRowsDeleted].forEach((rowKey=>newData.push[rowKey]))

    //Object.keys(state.filters)

    return { newFilters: state.filters, newData: newData }
}

/** algoritmo para eliminar filtro en mod array
//find filter
    const filterIndex = state.filters.findIndex(filter => filter.key === filterKey)
    if (filterIndex < 0) {
        console.error("filter no found: " + filterKey);
        return { newFilters: state.filters, newData: state.currentData }
    }
    if (filterIndex === 0 && state.filters.length === 1) {
        return { newFilters: [], newData: Object.keys(state.data).map(key => state.data[key]) }
    }
    if (filterIndex === state.filters.length - 1) {
        //add delete rows
        let newData = [...state.currentData]
        let newFilters = [...state.filters]
        newFilters.splice(filterIndex, 1)
        state.filters[filterIndex].keyRowsDeleted.forEach((rowKey) => newData.push(state.data[rowKey]))
        return { newFilters: newFilters, newData: newData }
    }
    if (filterIndex > -1) {
        let newFilters = []
        let data = [...state.currentData]
        state.filters[filterIndex].keyRowsDeleted.forEach((rowKey) => data.push(state.data[rowKey]))
        //console.log("delete data",data);
        let newData = []
        //apply filters
        state.filters.forEach((filter, index) => {
            if (filterIndex < index) {
                console.log(filterIndex,index);
                let newFilter = {...filter}
                switch (filter.type) {
                    case FILTER.TYPES.ONLY_CONTENT:
                        data.forEach(row=>{
                            if (onlyContentFilter(row,newFilter.columnLabel)) {
                                newData.push(row)
                            }else{
                                newFilter.keyRowsDeleted.add(row["_properties" + state.tableId].key)
                            }
                        })
                        //newData = newData.filter(row => )
                        break;
                    case FILTER.TYPES.TEXT:
                        data.forEach(row=>{
                            if (textFilter(newFilter.value,row,newFilter.columnLabel)) {
                                newData.push(row)
                            }else{
                                newFilter.keyRowsDeleted.add(row["_properties" + state.tableId].key)
                            }
                        })
                        break;
                    case FILTER.TYPES.SECTION:

                        break;
                    case FILTER.TYPES.NUMBER:

                        break;
                        default:
                            break;
                    }
                    newFilters.push(newFilter)
                } else {
                    if (index !== filterIndex) {
                        newFilters.push(filter)
                    }
                }
            });
            return { newFilters, newData }
        }
        console.error("filter no found: " + filterKey);
        return { newFilters: state.filters, newData: state.currentData }
 */