import { useState, useEffect } from "react";
import Table from "./table";
import { formatJsonTable } from "./utiles";
import TextField from '@mui/material/TextField';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function SigmulonRegulators({ idPanel, sigmulonRegulators }) {
    const [_jtRegulators, set_jtRegulators] = useState();
    //console.log(sigmulonRegulators)
    useEffect(() => {
        let panel = document.getElementById(idPanel)
        if (panel) {
            set_jtRegulators(formatJsonTable(panel, sigmulonRegulators))
        }
    }, [sigmulonRegulators, idPanel])

    const _handleUpdate = (event) => {
        //console.log(event.target.value)
        const keyword = event.target.value
        let str = new RegExp(keyword.toLowerCase());
        const filterSG = sigmulonRegulators.filter(sg => (str.test(sg.name.toLowerCase())) || str.test(sg._id.toLowerCase()))
        let panel = document.getElementById(idPanel)
        if (panel) {
           set_jtRegulators(formatJsonTable(panel,filterSG)) 
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
                    !_jtRegulators
                        ? (<p>Loading...</p>)
                        : <Table columns={_jtRegulators.columns} data={_jtRegulators.data} link="/regulon" />
                }
            </div>
        </div>
    );
}

export default SigmulonRegulators;