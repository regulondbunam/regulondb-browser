import React from 'react';
import Table from './table';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const TU_COLUMNS = [
    {
        Header: 'Name',
        accessor: 'tf',
        width: 300,
    },
    {
        Header: 'Function',
        accessor: 'tfFunction',
        width: 200,
    }
]

function formatTable(transcriptionFactor = []) {
    let data = []

    transcriptionFactor.forEach((tf) => {
        //console.log(tu.firstGene.name)
        data.push({
            tf: {
                id: tf._id,
                name: tf.name,
            },
            tfFunction: tf.function,
        })

    })
    return data
}

function TranscriptionFactor({ transcriptionFactors, idPanel = "regulates_tu" }) {
    const ATTRIBUTES = ["TF name", "Function"]
    const tuList = React.useMemo(() => { return formatTable(transcriptionFactors) }, [transcriptionFactors])
    const [_filter, set_filter] = React.useState(ATTRIBUTES[0]);
    const [_tuList, set_tuList] = React.useState(tuList);

    //console.log(tu);

    const _handleUpdate = (event) => {
        //console.log(event.target.value)
        const keyword = event.target.value
        let str = new RegExp(keyword.toLowerCase());
        let filterTu = undefined
        switch (_filter) {
            case "TF name":
                filterTu = tuList.filter(item => str.test(item.tu.name.toLowerCase()))
                break;
            case "Function":
                filterTu = tuList.filter(tu => str.test(tu.tuFunction.toLowerCase()))
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
            <h2>Transcription Factors</h2>
            <p className='p_accent'> {`Total of transcriptionFactors: ${transcriptionFactors.length}`} </p>
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

export default TranscriptionFactor;

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