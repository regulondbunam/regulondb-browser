import React from 'react';
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import Genes from './genes';
import Operon from './operon';
import TranscriptionFactor from './transcriptionFactor';
import TranscriptionUnit from './transcriptionUnit';
import SigmaFactor from './sigmaFactor';

//import "./transcriptionFactor.css"

function Regulates({regulates}) {
    const [_show, set_show] = React.useState(true);
    const {
        genes,
        operons,
        sigmaFactors,
        transcriptionFactors,
        transcriptionUnits,
    } = regulates
    //console.log(regulates);
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
                <div style={{ margin: "0 5% 0 5%", padding: "0 0 20px 0" }} >
                    {genes.length > 0 && ( <Genes genes={genes} />)}
                    {operons.length > 0 && ( <Operon operons={operons} /> )}
                    {sigmaFactors.length > 0 && ( <SigmaFactor sigmaFactor={sigmaFactors} /> )}
                    {transcriptionFactors.length > 0 && ( <TranscriptionFactor transcriptionFactors={transcriptionFactors} /> )}
                    {transcriptionUnits.length > 0 && ( <TranscriptionUnit transcriptionUnits={transcriptionUnits} /> )}
                </div>
            )}

        </Paper>

    );
}

export default Regulates;

/**
 *  
                    
                   
                   
 */