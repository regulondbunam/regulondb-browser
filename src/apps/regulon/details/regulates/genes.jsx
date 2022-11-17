import React from 'react';
import Table from "./table";
import { formatJsonTable } from "./utiles";
import TextField from '@mui/material/TextField';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function Genes({ genes, idPanel = "regulates_genes" }) {
    const [_genes, set_genes] = React.useState();

    React.useEffect(() => {
        let panel = document.getElementById(idPanel)
        if (panel) {
            set_genes(formatJsonTable(panel, genes))
        }
    }, [genes, idPanel])

    const _handleUpdate = (event) => {
        //console.log(event.target.value)
        const keyword = event.target.value
        let str = new RegExp(keyword.toLowerCase());
        const filterSG = genes.filter(sg => (str.test(sg.name.toLowerCase())) || str.test(sg.id.toLowerCase()) || str.test(sg.function.toLowerCase()))
        let panel = document.getElementById(idPanel)
        if (panel) {
            set_genes(formatJsonTable(panel, filterSG))
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
            <h2>Genes</h2>
            <p className='p_accent'> {`Total of genes: ${genes.length}`} </p>
            <div style={styleFilter}>
                <div><FilterAltIcon /></div>
                <div style={{ width: "50%" }} >
                    <TextField size="small" sx={{ width: "100%" }} id="sgFilter-basic" label="Filter" variant="standard"
                        onChange={_handleUpdate}
                    />
                </div>
                <div>
                {_genes?.total &&(<p className='p_accent' > ({_genes.total}) </p>)}
                </div>
            </div>
            <div id={idPanel} style={{ margin: "0 2% 1px 5%" }} >
                {
                    !_genes
                        ? (<p>Loading...</p>)
                        : <Table columns={_genes.columns} data={_genes.data} link="/gene" />
                }
            </div>
        </div>
    );
}

export default Genes;