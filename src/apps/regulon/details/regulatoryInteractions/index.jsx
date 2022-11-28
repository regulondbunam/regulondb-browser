import React from 'react';
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import TableList from './table';

const COLUMNS_LIST = [
    {
        Header: '---',
        accessor: `_data`,
        width: "100%"
    },
]

function FormatData(regulatoryInteractions = []){
    let formatIR = []
    regulatoryInteractions.forEach((ri)=>{
        formatIR.push({
            _data: ri
        })
    })
    return formatIR
}

function RegulatoryInteractions({ regulatoryInteractions, allCitations }) {

    const [_data, set_data] = React.useState(FormatData(regulatoryInteractions));
    const [_show, set_show] = React.useState(true);

    console.log(regulatoryInteractions);

    return (
        <Paper>
            <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                    <IconButton
                        sx={{ width: "10px", height: "10px" }}
                        aria-label="view"
                        onClick={() => {
                            set_show(!_show);
                        }}
                    >
                        {_show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </div>
                <div>
                    <h2>Regulatory Interactions</h2>
                </div>
            </div>
            {_show && (
                <div style={{ margin: "0 5% 0 5%", padding: "0 0 20px 0" }} >
                    <div>
                        Filter
                    </div>
                    <div>
                        <TableList columns={COLUMNS_LIST} data={_data} allCitations={allCitations} />
                    </div>
                </div>
            )}

        </Paper>

    );
}

export default RegulatoryInteractions;