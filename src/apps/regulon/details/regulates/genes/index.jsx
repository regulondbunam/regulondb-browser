import React from 'react';
import { Table } from './Table';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const GENE_COLUMNS = [
    {
        Header: 'Gene',
        columns: [
            {
                Header: ' . ',
                accessor: 'gene',
                width: 100,
            },
        ],
    },
    {
        Header: 'Multifunction',
        columns: [
            {
                Header: 'Name',
                accessor: 'multifunction',
                width: 200
            },
        ],
    },
    {
        Header: 'Gene Ontology Terms',
        columns: [
            {
                Header: 'Biological Process',
                accessor: 'biologicalProcess',
                width: 200,
            },
            {
                Header: 'Cellular Component',
                accessor: 'cellularComponent',
                width: 200,
            },
            {
                Header: 'Molecular Function',
                accessor: 'molecularFunction',
                width: 200,
            },
        ],
    }
]

function formatTable(genes = []) {
    let data = []

    genes.forEach((gene) => {
        const terms = gene.terms
        const strMultifunction = terms?.multifun ? terms.multifun.map((multi) => { return multi.name }).join(", ") : ""
        const strBiologicalProcess = terms?.geneOntology ? terms.geneOntology.biologicalProcess.map((multi) => { return multi.name }).join(", ") : ""
        const strCellularComponent = terms?.geneOntology ? terms.geneOntology.cellularComponent.map((multi) => { return multi.name }).join(", ") : ""
        const strMolecularFunction = terms?.geneOntology ? terms.geneOntology.molecularFunction.map((multi) => { return multi.name }).join(", ") : ""
        data.push({
            gene: {
                id: gene.id,
                name: gene.name,
                function: gene.function
            },
            multifunction: terms.multifun,
            strMultifunction: strMultifunction,
            biologicalProcess: terms.geneOntology?.biologicalProcess ? terms.geneOntology?.biologicalProcess : [],
            strBiologicalProcess: strBiologicalProcess,
            cellularComponent: terms.geneOntology?.cellularComponent ? terms.geneOntology?.cellularComponent : [],
            strCellularComponent: strCellularComponent,
            molecularFunction: terms.geneOntology?.molecularFunction ? terms.geneOntology?.molecularFunction : [],
            strMolecularFunction: strMolecularFunction,
        })

    })
    return data
}

function Genes({ genes, idPanel = "regulates_genes" }) {
    const ATTRIBUTES = ["Gene name", "Gene id", "Function", "Multifunction", "Biological Process", "Cellular Component", "Molecular Function"]
    const genesList = React.useMemo(() => { return formatTable(genes) }, [genes])
    const [_filter, set_filter] = React.useState(ATTRIBUTES[0]);
    const [_genesList, set_genesList] = React.useState(genesList);

    //console.log(genes);

    const _handleUpdate = (event) => {
        //console.log(event.target.value)
        const keyword = event.target.value
        let str = new RegExp(keyword.toLowerCase());
        let filterGenes = undefined
        switch (_filter) {
            case "Gene name":
                filterGenes = genesList.filter(item => str.test(item.gene.name.toLowerCase()))

                break;
            case "Gene id":
                filterGenes = genesList.filter(item => str.test(item.gene.id.toLowerCase()))
                break;
            case "Function":
                filterGenes = genesList.filter(item => str.test(item.gene.function.toLowerCase()))
                break;
            case "Multifunction":
                filterGenes = genesList.filter(item => str.test(item.strMultifunction.toLowerCase()))
                break;
            case "Biological Process":
                filterGenes = genesList.filter(item => str.test(item.strBiologicalProcess.toLowerCase()))
                break;
            case "Cellular Component":
                filterGenes = genesList.filter(item => str.test(item.strCellularComponent.toLowerCase()))
                break;
            case "Molecular Function":
                filterGenes = genesList.filter(item => str.test(item.strMolecularFunction.toLowerCase()))
                break;
            default:
                filterGenes = genesList
                break;
        }
        set_genesList(filterGenes)
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
            <div style={styleFilter} >
                <div><p className="p_accent" >Filter by</p></div>
                <div><SelectFilter _filter={_filter} set_filter={set_filter} attributes={ATTRIBUTES} /></div>
                <div><TextField size="small" sx={{ width: "100%" }} id="sgFilter-basic" label={_filter} variant="standard"
                    onChange={_handleUpdate}
                /></div>
            </div>
            <div id={idPanel} style={{ margin: "0 2% 1px 5%", overflow: "auto" }} >
                {
                    !_genesList
                        ? (<p>Loading...</p>)
                        : <Table columns={GENE_COLUMNS} data={_genesList} />
                }
            </div>
        </div>
    );
}

export default Genes;

function SelectFilter({ _filter, set_filter, attributes = [] }) {

    const handleChange = (event) => {
        set_filter(event.target.value);
    };

    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="filter-select-small">Attribute</InputLabel>
            <Select
                labelId="filter-select-small"
                id="filter-select-small"
                value={_filter}
                label="Promoter attribute"
                onChange={handleChange}
            >
                {attributes.map((attribute, index) => {
                    return <MenuItem key={"promoter_attribute_" + attribute + " " + index} value={attribute}>{attribute}</MenuItem>
                })}
            </Select>
        </FormControl>
    );
}