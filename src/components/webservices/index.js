import { useGetRegulonData } from "./regulon";
import { useGetGenesBy, useGetGenesBySearch } from './gene';
import { useGetOperonByID, useGetOperonByTuId, useGetOperonBySearch, useGetOperonByAdvancedSearch } from './operon'
import useGetObjectList from "./objectList";

export {
    useGetRegulonData, useGetGenesBy, useGetGenesBySearch,
    useGetObjectList,
    useGetOperonByID, useGetOperonByTuId, useGetOperonBySearch, useGetOperonByAdvancedSearch,
}