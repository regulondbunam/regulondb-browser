import React from 'react';
import TableGeneInfo from './descriptionTab/TableGeneInfo'
import TableOperon from './descriptionTab/TableOperon'
import TableRegulators from './descriptionTab/TableRegulators'
//import TableContext from './descriptionTab/TableContext'
//import TableShineDalgarno from './descriptionTab/TableShineDalgarno'
import TableGeneExternalID from './descriptionTab/TableGeneExternalID'
import GraphicGene from './descriptionTab/GraphicGene'
//import TableEviRef from './descriptionTab/TableReferences'


const GeneDescription = ({
    geneID,
    showER = true
}) => {
    return (
        <>
            <nav style={{ overflow: 'hidden' }} >
                <br />
                <br />
                <GraphicGene idGene={geneID} />
            </nav>
            <article>
                <h2>Gene Information</h2>
                <TableGeneInfo idGene={geneID} />
                <br />
                <h2>Gene Regulation</h2>
                <h3> &nbsp; Operon Arrangement</h3>
                <TableOperon idGene={geneID} />
                <br />
                <h3> &nbsp; Regulators</h3>
                <TableRegulators idGene={geneID} />
                <br />
                {

                }
            </article>
            <aside>
                <div style={{ paddingTop: "25px" }}>
                    <TableGeneExternalID idGene={geneID} />
                </div>
            </aside>
        </>
    );


}
/*
<h1>ShineDalgarno</h1>
            <TableShineDalgarno idGene={geneID}/>

            
            
            <br/>
            <h3>Context</h3>
            <TableContext idGene={geneID} />

            showER
                ?<><h2>Evidence and References</h2>
                <TableEviRef idGene={geneID} /></>
                :<></>
            

        aside

            <div style={{paddingTop: "25px"}}>
            <TableGeneExternalID idGene={geneID}/>
            </div>
            
            
 */

export default GeneDescription;