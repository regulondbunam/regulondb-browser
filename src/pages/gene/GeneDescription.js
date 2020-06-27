import React from 'react';
import TableGeneInfo from './descriptionTab/TableGeneInfo'
import TableOperon from './descriptionTab/TableOperon'
import TableRegulators from './descriptionTab/TableRegulators'
import TableContext from './descriptionTab/TableContext'
import TableShineDalgarno from './descriptionTab/TableShineDalgarno'


const GeneDescription = ({
    geneID
}) => {
    return (
        <>
            <h1>Gene Information</h1>
            <TableGeneInfo idGene={geneID} />
            <h1>Gene Regulation</h1>
            <TableOperon idGene={geneID} />
            
        </>
    );


}
/*

            <TableRegulators idGene={geneID} />
            <TableContext idGene={geneID} />
            <h1>ShineDalgarno</h1>
            <TableShineDalgarno idGene={geneID}/>
 */

export default GeneDescription;