import React from 'react';
import Table from "./table";
import { formatJsonTable } from "./utiles";
import TextField from '@mui/material/TextField';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function Operon({ operon, idPanel = "regulates_operon" }) {
    const [_operon, set_operon] = React.useState();

    React.useEffect(() => {
        let panel = document.getElementById(idPanel)
        if (panel) {
            set_operon(formatJsonTable(panel, operon))
        }
    }, [operon, idPanel])

    const _handleUpdate = (event) => {
        //console.log(event.target.value)
        const keyword = event.target.value
        let str = new RegExp(keyword.toLowerCase());
        const filterSG = operon.filter(sg => (str.test(sg.name.toLowerCase())) || str.test(sg.id.toLowerCase()) || str.test(sg.function.toLowerCase()) || str.test(sg.firstGene.name.toLowerCase()))
        let panel = document.getElementById(idPanel)
        if (panel) {
            set_operon(formatJsonTable(panel, filterSG))
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
            <h2>Operon</h2>
            <p className='p_accent'> {`Total of operon: ${operon.length}`} </p>
            <div style={styleFilter}>
                <div><FilterAltIcon /></div>
                <div style={{ width: "50%" }} >
                    <TextField size="small" sx={{ width: "100%" }} id="sgFilter-basic" label="Filter" variant="standard"
                        onChange={_handleUpdate}
                    />
                </div>
                <div>
                {_operon?.total &&(<p className='p_accent' > ({_operon.total}) </p>)}
                </div>
            </div>
            <div id={idPanel} style={{ margin: "0 2% 1px 5%" }} >
                {
                    !_operon
                        ? (<p>Loading...</p>)
                        : <Table columns={_operon.columns} data={_operon.data} link="/gene" />
                }
            </div>
        </div>
    );
}

export default Operon;