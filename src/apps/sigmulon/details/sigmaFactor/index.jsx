import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "./table";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function formatJsonTable(panel, elements) {
    let panelWidth = panel.clientWidth
    let columns = []
    let data = []
    let cellWidth = 95
    const numberColumns = panelWidth / (cellWidth + 5)
    for (let i = 1; i < numberColumns; i++) {
        columns.push({
            Header: '-',
            accessor: `column_${i}`,
            width: cellWidth
        })
    }
    if (elements.length > 0) {
        let rowGenes = []
        elements.forEach((gene) => {
            if (rowGenes.length < numberColumns) {
                rowGenes.push(gene)
            } else {
                let row = {}
                rowGenes.forEach((gn, i) => {
                    row[`column_${i+1}`] = gn
                })
                data.push(row)
                rowGenes = [gene]
            }
        })
        if (rowGenes.length > 0) {
            let row = {}
            rowGenes.forEach((gn, i) => {
                row[`column_${i+1}`] = gn.name
            })
            data.push(row)
        }
    }
    return { columns: columns, data: data }
}

function SigmaFactor({ sigmaFactor, allCitations }) {
    const [_showGenes, set_showGenes] = useState(true);
    const [_sigmulonGenes, set_sigmulonGenes] = useState(sigmaFactor.sigmulonGenes);
    const [_jtGenes, set_jtGenes] = useState();
    const [_jtRegulators, set_jtRegulators] = useState();

    const idPanelGenes = "sigmaGenesInfo"
    const idPanelRegulators = "sigmaRegulatorsInfo"

    useEffect(() => {
        let panelGenes = document.getElementById(idPanelGenes)
        let panelRegulators = document.getElementById(idPanelRegulators)

        if (panelGenes && !_jtGenes) {
            set_jtGenes(formatJsonTable(panelGenes,_sigmulonGenes))
        }
    }, [_jtGenes, _sigmulonGenes]);
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
                        <div>
                            {_sigmulonGenes.length > 0 && (
                                <div>
                                    {
                                        !_jtGenes
                                            ? (<p>Loading...</p>)
                                            : <Table columns={_jtGenes.columns} data={_jtGenes.data} link="/gene" />
                                    }

                                </div>
                            )}
                        </div>
                    )}
                    <br />
                </Paper>

            </article>

        </div>
    );
}

export default SigmaFactor;