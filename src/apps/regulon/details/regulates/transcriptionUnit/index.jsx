import React from 'react';
import Table from './Table';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const TU_COLUMNS = [
    {
        Header: 'Name',
        accessor: 'tu',
        width: 300,
    },
    {
        Header: 'Function',
        accessor: 'tuFunction',
        width: 200,
    },
    {
        Header: 'First Gene',
        accessor: 'firstGene',
        width: 200,
    },
]

function formatTable(transcriptionUnits = []) {
    let data = []

    transcriptionUnits.forEach((tu) => {
        //console.log(tu.firstGene.name)
        data.push({
            tu: {
                id: tu._id,
                name: tu.name,
            },
            tuFunction: tu.function,
            firstGene: {
                id: tu.firstGene._id,
                name: tu.firstGene.name,
            }
        })

    })
    return data
}

function TranscriptionUnit({ transcriptionUnits, idPanel = "regulates_tu" }) {
    const ATTRIBUTES = ["TU name", "Function", "First gene"]
    const tuList = React.useMemo(() => { return formatTable(transcriptionUnits) }, [transcriptionUnits])
    const [_filter, set_filter] = React.useState(ATTRIBUTES[0]);
    const [_tuList, set_tuList] = React.useState(tuList);

    //console.log(tu);

    const _handleUpdate = (event) => {
        //console.log(event.target.value)
        const keyword = event.target.value
        let str = new RegExp(keyword.toLowerCase());
        let filterTu = undefined
        switch (_filter) {
            case "TU name":
                filterTu = tuList.filter(item => str.test(item.tu.name.toLowerCase()))
                break;
            case "Function":
                filterTu = tuList.filter(tu => str.test(tu.tuFunction.toLowerCase()))
                break;
            case "First gene":
                filterTu = tuList.filter(tu => str.test(tu.firstGene.name.toLowerCase()))
                break;
            default:
                filterTu = tuList
                break;
        }
        set_tuList(filterTu)
    }

    const styleFilter = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "10px",
        marginRight: "10px"
    }

    return (
        <div>
            <h2>Transcription Units</h2>
            <p className='p_accent'> {`Total of transcriptionUnits: ${transcriptionUnits.length}`} </p>
            <div style={styleFilter} >
                <div><p className="p_accent" >Filter by</p></div>
                <div><SelectFilter _filter={_filter} set_filter={set_filter} attributes={ATTRIBUTES} /></div>
                <div><TextField size="small" sx={{ width: "100%" }} id="sgFilter-basic" label={_filter} variant="standard"
                    onChange={_handleUpdate}
                /></div>
            </div>
            <div id={idPanel} style={{ margin: "0 2% 1px 5%", overflow: "auto" }} >
                {
                    !_tuList
                        ? (<p>Loading...</p>)
                        : <Table columns={TU_COLUMNS} data={_tuList} />
                }
            </div>
        </div>
    );
}

export default TranscriptionUnit;

function SelectFilter({ _filter, set_filter, attributes = [] }) {

    const handleChange = (event) => {
        set_filter(event.target.value);
    };

    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="filter-select-small">Attribute</InputLabel>
            <Select
                labelId="filter-select-small"
                id="filter-select-small"
                value={_filter}
                label="Promoter attribute"
                onChange={handleChange}
            >
                {attributes.map((attribute, index) => {
                    return <MenuItem key={"promoter_attribute_" + attribute + " " + index} value={attribute}>{attribute}</MenuItem>
                })}
            </Select>
        </FormControl>
    );
}