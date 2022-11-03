import React, { useState} from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SigmulonGenes from "./sigmulonGenes";



function SigmaFactor({ sigmaFactor, allCitations }) {

    const [_showGenes, set_showGenes] = useState(true);

    const idPanelGenes = "sigmaGenesInfo"
    const idPanelRegulators = "sigmaRegulatorsInfo"

    //console.log(sigmaFactor);
    return (
        <div>
            <article>
                <Paper>
                    <div style={{ marginLeft: "2%", marginTop: "2%" }} >
                        <h2>Sigma Factor</h2>
                    </div>
                    <div style={{ marginLeft: "5%" }} >
                        <div>
                            <p className="p_accent">Synonyms:</p>
                            <p style={{ marginLeft: "2%" }} >{sigmaFactor.synonyms.join(", ")}</p>

                        </div>
                        <div>
                            <p className="p_accent">Gene:</p>
                            <Link to={`/gene/${sigmaFactor.gene._id}`} ><p style={{ marginLeft: "2%", fontSize: "20px" }}>{sigmaFactor.gene.name}</p></Link>
                        </div>
                    </div>
                    <br />
                </Paper>
                <br />
                {sigmaFactor.sigmulonGenes.length > 0 && (
                    <Paper>
                        <div id={idPanelGenes} style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div>
                                    <IconButton
                                        sx={{ width: "10px", height: "10px" }}
                                        aria-label="view"
                                        onClick={() => {
                                            set_showGenes(!_showGenes);
                                        }}
                                    >
                                        {_showGenes ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </IconButton>
                                </div>
                                <div>
                                    <h2>Sigmulon Genes</h2>
                                </div>
                            </div>
                        </div>
                        {_showGenes && (
                            <SigmulonGenes idPanel={idPanelGenes} sigmulonGenes={sigmaFactor.sigmulonGenes} />
                        )}
                        <br />
                    </Paper>
                )}


            </article>

        </div>
    );
}

export default SigmaFactor;