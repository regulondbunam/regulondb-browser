import React from 'react';
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import GeneOntology from './geneOntology';
import Multifun from './multifun';

function Terms({ geneOntology, multifun, allCitations }) {
    //console.log(geneOntology);
    const [_show, set_show] = React.useState(true);
    //console.log(transcriptionFactor);
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
                    <h2> Terms </h2>
                </div>
            </div>
            {_show && (
                <div style={{ margin: "0 5% 0 5%", padding: "0 0 20px 0" }} >
                    {geneOntology &&(
                        <GeneOntology geneOntology={geneOntology} allCitations={allCitations} />
                    )}
                    <br />
                    {multifun.length>0 && (
                        <Multifun multifun={multifun} />
                    )}
                </div>
            )}

        </Paper>

    );
}
export default Terms;