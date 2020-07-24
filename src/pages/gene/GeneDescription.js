import React from 'react';
import TableGeneInfo from './descriptionTab/TableGeneInfo'
import TableOperon from './descriptionTab/TableOperon'
import TableRegulators from './descriptionTab/TableRegulators'
import TableContext from './descriptionTab/TableContext'
//import TableShineDalgarno from './descriptionTab/TableShineDalgarno'
import TableGeneExternalID from './descriptionTab/TableGeneExternalID'
import GraphicGene from './descriptionTab/GraphicGene'


const GeneDescription = ({
    geneID
}) => {
    return (
        <>
        <nav style={{overflow: 'hidden'}} >
            <br/>
            <br/>
        <GraphicGene idGene={geneID} />
        </nav>
        <article>
            <h1>Gene Information</h1>
            <TableGeneInfo idGene={geneID} />
            <br/>
            <h1>Gene Regulation</h1>
            <h2>Operon Arrangement</h2>
            <TableOperon idGene={geneID} />
            <br/>
            <h2>Regulators</h2>
            <TableRegulators idGene={geneID} />
            <h2>Context</h2>
            <TableContext idGene={geneID} />
            
        </article>
        <aside>
            <div style={{paddingTop: "25px"}}>
            <TableGeneExternalID idGene={geneID}/>
            </div>
            
        </aside>
        </>
    );


}
/*
<h1>ShineDalgarno</h1>
            <TableShineDalgarno idGene={geneID}/>
            
            
 */

export default GeneDescription;