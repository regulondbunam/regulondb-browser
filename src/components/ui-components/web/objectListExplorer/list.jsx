import { useMemo, useState } from "react";
import { formatJsonTable } from "./formatData";
import WebServices from "../../../webservices/WebServices";
import Style from "./style.module.css"
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export function List({ attributesEnabled, datamartType, title, ComponentState = () => { } }) {
    const [ObjectsData, setObjectsData] = useState();
    const [FilterData, setFilterData] = useState();
    if (!ObjectsData) {
        return <WebServices
            datamart_name={"getObjectList"}
            variables={{ datamartType: datamartType }}
            getData={(data) => {
                const jsonTable = formatJsonTable(data);
                setObjectsData(jsonTable);
                setFilterData(jsonTable)
            }}
            getState={(state) => {
                const titleState = {
                    loading: "Loading list of " + datamartType + "... wait a moment",
                    done: `${title} List`,
                    error: "sorry we have a problem ... :( try again later"
                }
                ComponentState({ state: state, title: titleState[state] })
            }}
        />
    }
    console.log(FilterData);
    return (
        <div className={Style.mainDiv}>
            <SelectFilter ObjectsData={ObjectsData} setFilterData={setFilterData} attributesEnabled={attributesEnabled} />
        </div>
    )
}

const FILTER_STRING = (str, attribute, ObjectsData) => { return ObjectsData.data.filter(object => str.test(object._data[attribute].toLowerCase())) }
const FILTER_ARRAY_STRING = (str, attribute, ObjectsData) => { return ObjectsData.data.filter(object => (object._data[attribute].find(objName => str.test(objName.toLowerCase())))) }

/*
_id: String
encodedGenes: [String]
name: String
productsName: [String]
sigmulonGeneName: String
statistics: ListServiceStatistics
summary: SrnaSummary
synonyms: [String]
*/

function SelectFilter({ ObjectsData, setFilterData, attributesEnabled = [] }) {
    const [AttributeSelected, setAttributeSelected] = useState("_id");
    const attributesList = useMemo(() => {
        let list = {}
        attributesEnabled.forEach((attributeEnabled) => {
            switch (attributeEnabled) {
                case "_id":
                    list._id = {
                        label: "id",
                        filter: FILTER_STRING
                    }
                    break;
                case "encodedGenes":
                    list.encodedGenes = {
                        label: "Gene",
                        filter: FILTER_ARRAY_STRING
                    }
                    break;
                case "name":
                    list.name = {
                        label: "Name",
                        filter: FILTER_STRING
                    }
                    break;
                case "productsName":
                    list.productsName = {
                        label: "Product Name",
                        filter: FILTER_ARRAY_STRING
                    }
                    break;
                case "sigmulonGeneName":
                    list.sigmulonGeneName = {
                        label: "sigmulon Gene Name",
                        filter: FILTER_STRING
                    }
                    break;
                case "synonyms":
                    list.synonyms = {
                        label: "Synonyms",
                        filter: FILTER_ARRAY_STRING
                    }
                    break;
                default:
                    break;
            }
        })
        return list
    }, [attributesEnabled])




    const handleChange = (event) => {
        setAttributeSelected(event.target.value);
    };

    const _handleUpdate = (event) => {
        //console.log(event.target.value)
        const keyword = event.target.value
        const str = new RegExp(keyword.toLowerCase());
        let filterTP = ObjectsData
        if (attributesList[AttributeSelected]) {
            console.log(AttributeSelected);
            let filterData = attributesList[AttributeSelected].filter(str,AttributeSelected,ObjectsData)
            filterTP = { data: filterData, columns: ObjectsData.columns }
        }
        setFilterData(filterTP)
    }

    const styleFilter = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "10px",
        marginRight: "10px"
    }
    return (
        <div style={styleFilter} >
            <div><FilterAltIcon /></div>
            <div><p className="p_accent" >Filter list by</p></div>
            <div>
                {
                    attributesList && (
                        <FormControl variant="outlined" sx={{ m: 1, width: "100px" }} size="small">
                            <InputLabel id="filter-select-small">Attribute</InputLabel>
                            <Select
                                labelId="filter-select-small"
                                id="filter-select-small"
                                label="Attribute"
                                onChange={handleChange}
                                value={AttributeSelected}
                            >
                                {Object.keys(attributesList).map((key, index) => {
                                    return <MenuItem key={"promoter_attribute_" + attributesList[key].label + " " + index} value={key}>{attributesList[key].label}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    )
                }
            </div>
            <div><TextField size="small" sx={{ width: "100%" }} id="sgFilter-basic" variant="outlined"
                onChange={_handleUpdate}
            /></div>
        </div>
    );
}