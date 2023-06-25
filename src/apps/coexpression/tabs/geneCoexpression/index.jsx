import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import GeneDescription from './GeneDescription';

function descriptionProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function GeneCoexpression({ geneResults }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    if (!geneResults) {
        return null;
    };
    const genes = geneResults.getGenesBy.data;

    return (
        <Box sx={{ bgcolor: 'background.paper' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {genes.map((gene, index) => {
                        return <Tab key={"tab_geneCoexpression_" + index} label={gene.gene.name} {...descriptionProps(index)} />
                    })}
                </Tabs>
                <h2 style={{ color: "#3d779b" }}>Gene Information</h2>
                <br />
            </Box>
            {genes.map((gene, index) => {
                return <GeneDescription key={"geneCoexpression_geneDescription_" + index} value={value} index={index} gene={gene} />
            })}
        </Box>


    );
}
export default GeneCoexpression;