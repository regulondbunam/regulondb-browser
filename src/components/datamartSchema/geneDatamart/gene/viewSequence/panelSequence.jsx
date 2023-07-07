import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

import {
    FastaSequence,
    GenebankSequence,
} from "../../../../sequence";

const FORMATS = {
    fasta: "fasta",
    genebank: "genebank"
}

const OPTIONS = {
    reset: -1,
    color: 0,
    countItems: 1,
    fasta_CharactersPerLine: 2,
    genebank_Columns: 3,
}

const initOptions = {
    color: false,
    countItems: false,
    fasta_CharactersPerLine: 60,
    genebankColumns: 6,
}

function reducerOptions(state, action) {
    switch (action.type) {
        case OPTIONS.reset:
            return initOptions
        case OPTIONS.color:
            return { ...state, color: !state.color }
        case OPTIONS.countItems:
            return { ...state, countItems: !state.countItems }
        case OPTIONS.fasta_CharactersPerLine:
            return { ...state, fasta_CharactersPerLine: action.value }
        default:
            return state
    }
}

export default function PanelSequence({ sequence, _id, name, products }) {
    const [state, dispatch] = React.useReducer(reducerOptions, initOptions);
    const [format, setFormat] = React.useState(FORMATS.fasta);
    const handleChange = (event) => {
        setFormat(event.target.value);
    };
    let title = ""
    let domSequence = <></>
    switch (format) {
        case FORMATS.genebank:
            title = `gene: ${name}; product: ${products.map(product => product.name).join(", ")}`
            domSequence = <GenebankSequence sequence={sequence} color={state.color} countItems={state.countItems} title={title} />
            break;
        default:
            title = `RegulonDB|${_id}|gene: ${name}|product: ${products.map(product => product.name).join(", ")}`
            domSequence = <FastaSequence sequence={sequence} color={state.color}
                countItems={state.countItems} title={title}
                charactersPerLine={state.fasta_CharactersPerLine}
            />
            break;
    }

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", margin: "8px" }} >
                <p style={{ fontWeight: "bold", marginRight: "5px" }} >Sequence:</p>
                <FormControl sx={{ m: 1, minWidth: 120, margin: "0 5px 0 0" }} size="small">
                    <InputLabel sx={{ fontSize: 14 }} >Format</InputLabel>
                    <Select
                        sx={{ height: 30 }}
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={format}
                        label="format"
                        onChange={handleChange}
                    >
                        <MenuItem value={FORMATS.fasta}>Fasta</MenuItem>
                        <MenuItem value={FORMATS.genebank}>Genebank</MenuItem>
                    </Select>
                </FormControl>
                <MenuOptions state={state} dispatch={dispatch} format={format} />
                <DownloadOptions />
            </div>
            <div>
                {domSequence}
            </div>
        </div>

    );
}





function MenuOptions({ state, dispatch, format }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleChangeOption = (option,value) => {
        dispatch({ type: option, value: value })
    }
    //console.log(state);
    return (
        <div style={{ marginRight: "5px" }}>
            <Button
                id="demo-customized-button"
                variant="outlined"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{ height: 30 }}
            >
                Options
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <FormControlLabel
                        control={<Switch checked={state.color} onChange={() => { handleChangeOption(OPTIONS.color) }} />}
                        label="Color" />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <FormControlLabel
                        control={<Switch checked={state.countItems} onChange={() => { handleChangeOption(OPTIONS.countItems) }} />}
                        label="Count Items" />
                </MenuItem>
                <Divider />
                {(format === FORMATS.fasta) && (
                    <MenuItem>
                        <div style={{ display: "flex", flexDirection: "column", }} >
                            <p><b>Characters per line</b></p>
                            <div>
                                <TextField
                                    id="outlined-number"
                                    type="number"
                                    size='small'
                                    value={state.fasta_CharactersPerLine}
                                    onChange={(event) => {
                                        handleChangeOption(OPTIONS.fasta_CharactersPerLine,event.target.value)
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{ maxWidth: 75, marginRight: "5px" }}
                                />
                                <Button
                                    id="demo-customized-button"
                                    variant="outlined"
                                    disableElevation
                                    onClick={handleClose}
                                    sx={{ height: 40 }}
                                >
                                    Ok
                                </Button>
                            </div>
                        </div>
                    </MenuItem>
                )}
                <Divider />
                <MenuItem onClick={handleClose}>
                    <Button variant="outlined" size='small' onClick={()=>{handleChangeOption(OPTIONS.reset)}} >Reset Options</Button>
                </MenuItem>
            </Menu>
        </div>
    )
}

function DownloadOptions({ setOptions }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(!open)
    }
    return (
        <div style={{ marginRight: "5px" }} >
            <Button
                id="demo-customized-button"
                variant="outlined"
                disableElevation
                onClick={handleOpen}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{ height: 30 }}
            >
                Download
            </Button>
        </div>
    )
}
