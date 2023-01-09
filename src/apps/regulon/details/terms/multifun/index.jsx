import React from 'react';
import TableList from "./table"
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const COLUMNS = [
    {
        Header: 'Multifun Name',
        accessor: 'name',
        width: 150,
    },
    {
        Header: 'Genes',
        accessor: 'genes',
        width: 350,
    },
]

function formatTable(multifun = []) {
    let data = []

    multifun.forEach((fun) => {
        data.push({
            name: fun.name,
            genes: fun.genes,
        })
    })
    return data
}

function Multifun({ multifun, idPanel = "regulon_multifun" }) {
    const multifunList = React.useMemo(() => { return formatTable(multifun) }, [multifun])
    const ATTRIBUTES = [
        {
            value: "multifunName",
            label: "Multifun name",
            filter: (str) => { return multifunList.filter(fun => str.test(fun.name.toLowerCase())) },
        },
        {
            value: "geneName",
            label: "Gene name",
            filter: (str) => { return multifunList.filter(fun => fun.genes.find(gene => str.test(gene.gene_name.toLowerCase()))) },
        },
    ]

    const [_data, set_data] = React.useState(multifunList);
    const [_selection, set_selection] = React.useState(ATTRIBUTES[0]);

    const _handleUpdate = (event) => {
        const keyword = event.target.value
        let str = new RegExp(keyword.toLowerCase());
        let filterMultifun = multifunList
        if (_selection?.value) {
            filterMultifun = _selection.filter(str)
        }
        set_data(filterMultifun)
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
            <h2>Multifun</h2>
            <p className='p_accent'> {`Total of multifun: ${multifun.length}`} </p>
            <div style={styleFilter} >
                <div><p className="p_accent" >Filter by</p></div>
                <div><SelectFilter value={_selection.value} set_selection={set_selection} attributes={ATTRIBUTES} /></div>
                <div><TextField size="small" sx={{ width: "100%" }} id="sgFilter-basic" label={_selection.label} variant="standard"
                    onChange={_handleUpdate}
                /></div>
            </div>
            <div>
                        <TableList columns={COLUMNS} data={_data}/>
                    </div>
        </div>
    );
}

export default Multifun;

function SelectFilter({ value, set_selection, attributes = [] }) {

    const handleChange = (event) => {
        set_selection(attributes.find(a=>a.value===event.target.value));
    };

    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="filter-select-small">Attribute</InputLabel>
            <Select
                labelId="filter-select-small"
                id="filter-select-small"
                value={value}
                label="Promoter attribute"
                onChange={handleChange}
            >
                {attributes.map((attribute,index)=>{
                    return <MenuItem key={"riInteraction_attribute_" + attribute.value + " " + index} value={attribute.value}>{attribute.label}</MenuItem>
                })}
            </Select>
        </FormControl>
    );
}