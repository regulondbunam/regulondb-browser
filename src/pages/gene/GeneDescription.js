import React from 'react';
import TableGeneInfo from './descriptionTab/TableGeneInfo'
import TableOperon from './descriptionTab/TableOperon'



const GeneDescription = ({
    geneID
}) => {
    return (
        <>
            <h1>Gene Info</h1>
            <TableGeneInfo idGene={geneID} />
            <h1>Regulation</h1>
            <TableOperon idGene={geneID} />
        </>
    );


}

export default GeneDescription;