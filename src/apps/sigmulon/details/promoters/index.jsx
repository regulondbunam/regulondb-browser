import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
//import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TableList from './table';

const idPanel = "TP_divContent"

function formatJsonTable(transcribedPromoters = []) {
    //            width: cellWidth
    let columns = [
        {
            Header: '---',
            accessor: `_data`,
            width: "100%"
        },
    ]
    let data = []
    if (transcribedPromoters.length > 0) {
        transcribedPromoters.forEach(tp => {
            data.push({
                _data: tp
            })
        });
    }
    return { columns: columns, data: data }
}

function Promoters({ transcribedPromoters }) {
    const attributesList = ["Name","Sequence", "Operon ID","Transcribed Gene","Box Sequence"]
    const [_filter, set_filter] = useState(attributesList[0]);
    const [_jtTP, set_jtTP] = useState(formatJsonTable(transcribedPromoters));
    
    const _handleUpdate = (event) => {
        //console.log(event.target.value)
        const keyword = event.target.value
        const str = new RegExp(keyword.toLowerCase());
        let filterTP = undefined
        switch (_filter) {
            case "Sequence":
                filterTP = transcribedPromoters.filter(tp => {
                    if (tp.sequence) {
                        return (str.test(tp.sequence.toLowerCase()))
                    }
                    return false
                })
                break;
            case "Operon ID":
                filterTP = transcribedPromoters.filter(tp => (str.test(tp.operon_id.toLowerCase())))
                break;
            case "Transcribed Gene":
                filterTP = transcribedPromoters.filter(tp => (tp.transcribedGenes.find(tg => str.test(tg.name.toLowerCase()))))
                break;
            case "Box Sequence":
                filterTP = transcribedPromoters.filter(tp => (tp.boxes.find(bx => str.test(bx.sequence.toLowerCase()))))
                break;
            case "Name":
            default:
                filterTP = transcribedPromoters.filter(tp => (str.test(tp.name.toLowerCase())))
                break;
        }
        if (filterTP) {
            set_jtTP(formatJsonTable(filterTP))
        }
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
            <article>
                <h2>Transcribed Promoters</h2>
                <div style={styleFilter} >
                    <div><p className="p_accent" >Filter by</p></div>
                    <div><SelectFilter _filter={_filter} set_filter={set_filter} attributes={attributesList} /></div>
                    <div><TextField size="small" sx={{width: "100%"}} id="sgFilter-basic" label={_filter} variant="standard"
                        onChange={_handleUpdate}
                    /></div>
                </div>
                <div id={idPanel} >
                    <div>
                        <TableList columns={_jtTP.columns} data={_jtTP.data}  />
                    </div>
                </div>
            </article>
        </div>
    );
}

export default Promoters;

function SelectFilter({ _filter, set_filter, attributes = [] }) {



    const handleChange = (event) => {
        set_filter(event.target.value);
    };

    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="filter-select-small">Promoter attribute</InputLabel>
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