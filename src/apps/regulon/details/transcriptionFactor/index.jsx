import React from 'react';
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Note from './note';
import IconButton from "@mui/material/IconButton";
import Conformations from './conformations';
import EncodedFrom from './encode';
import Products from './products';
import "./transcriptionFactor.css"

function TranscriptionFactor({ transcriptionFactor, allCitations }) {
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
                    <h2>Transcription Factor {transcriptionFactor.name} </h2>
                </div>
            </div>
            {_show && (
                <div style={{ margin: "0 5% 0 5%", padding: "0 0 20px 0" }} >

                    {transcriptionFactor.synonyms.length > 0 && (
                        <div>
                            <p className="p_accent">Synonyms:</p> <p> {transcriptionFactor.synonyms.join(", ")}</p>
                        </div>
                    )}
                    {transcriptionFactor.conformations.length > 0 && (
                        <Conformations conformations={transcriptionFactor.conformations} allCitations={allCitations} />
                    )}
                    {transcriptionFactor.encodedFrom && (
                        <EncodedFrom encodedFrom={transcriptionFactor.encodedFrom} />
                    )}
                    {transcriptionFactor.products.length > 0 && (
                        <Products products={transcriptionFactor.products} />
                    )}
                    {transcriptionFactor.note && (
                        <Note note={transcriptionFactor.note} allCitations={allCitations} />
                    )}
                </div>
            )}

        </Paper>

    );
}

export default TranscriptionFactor;