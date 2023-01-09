import { useState, useEffect } from "react";
import Table from "./table";
import { formatJsonTable } from "./utiles";
import TextField from '@mui/material/TextField';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function SigmulonGenes({ idPanel, sigmulonGenes }) {
    const [_jtGenes, set_jtGenes] = useState();
    //console.log(sigmulonGenes)
    useEffect(() => {
        let panel = document.getElementById(idPanel)
        if (panel) {
            set_jtGenes(formatJsonTable(panel, sigmulonGenes))
        }
    }, [sigmulonGenes, idPanel])

    const _handleUpdate = (event) => {
        //console.log(event.target.value)
        const keyword = event.target.value
        let str = new RegExp(keyword.toLowerCase());
        const filterSG = sigmulonGenes.filter(sg => (str.test(sg.name.toLowerCase())) || str.test(sg._id.toLowerCase()))
        let panel = document.getElementById(idPanel)
        if (panel) {
           set_jtGenes(formatJsonTable(panel,filterSG)) 
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
            <div style={styleFilter}>
                <div><FilterAltIcon /></div>
                <div style={{width: "100%"}} >
                    <TextField size="small" sx={{width: "100%"}} id="sgFilter-basic" label="Filter" variant="standard"
                        onChange={_handleUpdate}
                    />
                    </div>
            </div>
            <div>
                {
                    !_jtGenes
                        ? (<p>Loading...</p>)
                        : <Table columns={_jtGenes.columns} data={_jtGenes.data} link="/gene" />
                }
            </div>
        </div>
    );
}

export default SigmulonGenes;