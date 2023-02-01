import { useState } from 'react';
import WebServices from '../../../components/webservices/WebServices';
import { UpdateTitle } from '../Title';
import TableList from './table';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

function formatJsonTable(regulons = []) {
    //            width: cellWidth
    let columns = [
        {
            Header: '---',
            accessor: `_data`,
            width: "100%"
        },
    ]
    let data = []
    if (regulons.length > 0) {
        regulons.forEach(regulon => {
            data.push({
                _data: regulon
            })
        });
    }
    return { columns: columns, data: data }
}

function SelectFilter({ _regulonData, set_filter}) {
    console.log(_regulonData);
    const attributesList = {
        name: {
            label: "Name",
            filter: (str) => { return _regulonData.data.filter(reg => str.test(reg._data.name.toLowerCase())) },
        },
        product: {
            label: "Product Name",
            filter: (str) => { return _regulonData.data.filter(reg => (reg._data.productsName.find(product => str.test(product.toLowerCase())))) },
        },
        synonyms: {
            label: "Synonyms",
            filter: (str) => { return _regulonData.data.filter(reg => (reg._data.synonyms.find(synonym => str.test(synonym.toLowerCase())))) },
        },
    }

    const [_attributeSelected, set_attributeSelected] = useState("name");
    const handleChange = (event) => {
        set_attributeSelected(event.target.value);
    };

    const _handleUpdate = (event) => {
        //console.log(event.target.value)
        const keyword = event.target.value
        const str = new RegExp(keyword.toLowerCase());
        let filterTP = _regulonData 
        if (attributesList[_attributeSelected]) {
            let filterData = attributesList[_attributeSelected].filter(str)
            filterTP = {data: filterData, columns: _regulonData.columns }
        }
        set_filter(filterTP)
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
            <div><p className="p_accent" >Filter by</p></div>
            <div>
                <FormControl variant="standard" sx={{ m: 1, width: "230px" }} size="small">
                    <InputLabel id="filter-select-small">Transcription factor attribute</InputLabel>
                    <Select
                        labelId="filter-select-small"
                        id="filter-select-small"
                        label="Transcription factor attribute"
                        onChange={handleChange}
                        value={_attributeSelected}
                    >
                        {Object.keys(attributesList).map((key, index) => {
                            return <MenuItem key={"promoter_attribute_" + attributesList[key].label + " " + index} value={key}>{attributesList[key].label}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </div>
            <div><TextField size="small" sx={{ width: "100%" }} id="sgFilter-basic" variant="standard"
                onChange={_handleUpdate}
            /></div>
        </div>
    );
}



function Home() {
    const [_regulonData, set_regulonData] = useState();
    const [_filter, set_filter] = useState();
    if (!_regulonData) {
        return <WebServices 
            datamart_name={"getObjectList"}
            variables={{datamartType: "regulon"}}
            getData={(data) => { 
                const jsonTable = formatJsonTable(data); 
                set_regulonData(jsonTable); 
                set_filter(jsonTable) 
            }} 
            getState={(state) => { 
                const titleState = {
                    loading: "Loading list of regulons... wait a moment",
                    done: "Regulons",
                    error: "sorry we have a problem ... try again later"
                }
                UpdateTitle({ state: state, title:titleState[state] })
            }} 
            />
    }
    UpdateTitle({title: "Regulons"})
    //console.log(_regulonData);
    return (
        <article>
            <div>
                <div>
                    <SelectFilter _regulonData={_regulonData} set_filter={set_filter} />
                </div>
                <div>
                    <TableList data={_filter.data} columns={_filter.columns} link="/regulon/" />
                </div>
            </div>
        </article>
    );
}

export default Home;