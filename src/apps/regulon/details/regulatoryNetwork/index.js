import React from 'react';
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import RegulatoryNetwork from '../../../../components/regulatoryNetwork/RegulatoryNetwork';


function DiagramRegulatoryNetwork({regulonId}) {
    const [_show, set_show] = React.useState(true);
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
                    <h2>Regulates</h2>
                </div>
            </div>
            {_show && (
                <RegulatoryNetwork id_regulon={regulonId} />
            )}

        </Paper>

    );
}

export default DiagramRegulatoryNetwork;