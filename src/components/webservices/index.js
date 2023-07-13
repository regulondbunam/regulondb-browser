import { useGetRegulonData } from "./regulon";
import { useGetGenesBy } from './gene';
import { useGetOperonByID, useGetOperonByTuId, useGetOperonBySearch, useGetOperonByAdvancedSearch } from './operon'
import useGetObjectList from "./objectList";

export {
    useGetRegulonData, useGetGenesBy,
    useGetObjectList,
    useGetOperonByID, useGetOperonByTuId, useGetOperonBySearch, useGetOperonByAdvancedSearch,
}