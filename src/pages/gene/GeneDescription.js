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
            <br/>
            <h1>Gene Regulation</h1>
            <h2>Operon</h2>
            <TableOperon idGene={geneID} />
            <h2>Regulators</h2>
            <TableRegulators idGene={geneID} />
            
        </>
    );


}
/*

            
            <TableContext idGene={geneID} />
            <h1>ShineDalgarno</h1>
            <TableShineDalgarno idGene={geneID}/>
 */

export default GeneDescription;