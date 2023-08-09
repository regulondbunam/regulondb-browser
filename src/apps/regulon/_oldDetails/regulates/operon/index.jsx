import React from 'react';
import Table from './Table';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const OPERON_COLUMNS = [
    {
        Header: 'Operon Name',
        accessor: 'operon',
        width: 300,
    },
    {
        Header: 'Function',
        accessor: 'operonFunction',
        width: 200,
    },
    {
        Header: 'First Gene',
        accessor: 'firstGene',
        width: 200,
    },
]

function formatTable(operons = []) {
    let data = []

    operons.forEach((operon) => {
        //console.log(operon.firstGene.name)
        data.push({
            operon: {
                id: operon._id,
                name: operon.name,
            },
            operonFunction: operon.function,
            firstGene: {
                id: operon.firstGene._id,
                name: operon.firstGene.name,
            }
        })

    })
    return data
}

function Operon({ operons, idPanel = "regulates_operon" }) {
    const ATTRIBUTES = ["Operon name", "Function", "First gene"]
    const operonList = React.useMemo(() => { return formatTable(operons) }, [operons])
    const [_filter, set_filter] = React.useState(ATTRIBUTES[0]);
    const [_operonList, set_operonList] = React.useState(operonList);

    //console.log(operon);

    const _handleUpdate = (event) => {
        //console.log(event.target.value)
        const keyword = event.target.value
        let str = new RegExp(keyword.toLowerCase());
        let filterOperon = undefined
        switch (_filter) {
            case "Operon name":
                filterOperon = operonList.filter(item => str.test(item.operon.name.toLowerCase()))
                break;
            case "Function":
                filterOperon = operonList.filter(operon => str.test(operon.operonFunction.toLowerCase()))
                break;
            case "First gene":
                filterOperon = operonList.filter(item => str.test(item.firstGene.name.toLowerCase()))
                break;
            default:
                filterOperon = operonList
                break;
        }
        set_operonList(filterOperon)
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
            <br />
            <h3>{`Regulated operons: ${operons.length}`}</h3>
            <div id={idPanel} style={{overflow: "auto" }} >
                {
                    !_operonList
                        ? (<p>Loading...</p>)
                        : <Table columns={OPERON_COLUMNS} data={_operonList} />
                }
            </div>
        </div>
    );
}

export default Operon;

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