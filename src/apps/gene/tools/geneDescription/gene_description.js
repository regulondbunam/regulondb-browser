import React from 'react';
import Graph from './gene_graph'
import Info from './gene_info'
import Operon from './gene_operon'
import Regulators from './gene_regulators'

const Description = ({
    all_citations = [],
    id_gene,
    id
}) => {
    return (
        <div id={`tab-description`}>
            <nav>
                <Graph id_gene={id_gene} />
            </nav>
            <article>
                <h2 id='geneInfo' >Gene Information</h2>
                <Info idGene={id_gene} allCitations={all_citations}/>
                <br />
                <h2 id='geneRegulation'>Gene Regulation</h2>
                <div style={{paddingLeft: '5%'}}>
                <h3>Operon Arrangement</h3>
                <Operon idGene={id_gene} />
                <Regulators idGene={id_gene} />
                </div>
                <br />
                <br />
            </article>
        </ div>
    );
}

export default Description;