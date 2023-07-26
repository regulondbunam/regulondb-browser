import React from 'react';
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { Extended } from './extended';
import { Table } from './ViewTable';

function RegulatoryInteractions({ regulatoryInteractions, allCitations }) {

    const VIEW_OPTIONS = ["Table", "Extended"]
    const views = {
        "Extended": <Extended regulatoryInteractions={regulatoryInteractions} allCitations={allCitations} />,
        "Table": <Table regulatoryInteractions={regulatoryInteractions} allCitations={allCitations} />
    }
    const [_show, set_show] = React.useState(true);
    const [view, setView] = React.useState(VIEW_OPTIONS[0]);

    //console.log(regulatoryInteractions);

    return (
        <div style={{ margin: "0 5% 0 5%", padding: "0 0 20px 0" }} >
            <div>
                <FormControl >
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        View Option
                    </InputLabel>
                    <NativeSelect
                        defaultValue={view}
                        inputProps={{
                            name: 'view option',
                            id: 'ri-viw-option',
                        }}
                        onChange={(event) => {
                            setView(event.target.value)
                        }}
                    >
                        {
                            VIEW_OPTIONS.map((value, index) => {
                                return <option key={"ri-viewOption-" + index + "-" + value} value={value}>{value}</option>
                            })
                        }
                    </NativeSelect>
                </FormControl>
                {views[view]}
            </div>
        </div>

    );
}

export default RegulatoryInteractions;