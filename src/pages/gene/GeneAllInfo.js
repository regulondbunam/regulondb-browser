import React from 'react';
import GnDescription from './GeneDescription'
import GnProducts from './GeneProduct'
import GnGrowthC from './GeneGrowthConditions'

const GeneAllInfo = ({
    idGene
}) => {
    return (
        <>
        <GnDescription geneID={idGene} showER={false} />
        <br/>
        <GnProducts geneID={idGene} />
        <br/>
        <GnGrowthC geneID={idGene} />
        </>
    );


}
/*
<h1>ShineDalgarno</h1>
            <TableShineDalgarno idGene={geneID}/>
            
            
 */

export default GeneAllInfo;