import React, { useEffect, useState } from 'react';
import Graph from '../../../../components/dtt_tool/dttTool'
import GetGeneInfo from '../../webServices/getGeneBy/getGeneInfo';
import { SpinnerCircle } from '../../../../components/ui-components/ui_components';
import GeneInfo from './gene_info';


const Description = ({
    all_citations = [],
    id_gene,
    id
}) => {

    const [_data, set_data] = useState()
    const [_state, set_state] = useState()

    if (_data && _state === "done") {
        return (
            <div>
                <nav>
                    <Graph id={id_gene} context="gene" />
                </nav>
                <article>
                    <h2>Gene Information</h2>
                    <GeneInfo gene={_data} />
                    <h2>Gene Regulation</h2>
                </article>
            </div>
        )
    }


    return (
        <div>
            {
                _state !== "error"
                    ? "Error to load gene info"
                    : <SpinnerCircle />
            }
            <GetGeneInfo id_gene={id_gene}
                resoultsData={(data) => { set_data(data) }}
                status={(state) => { set_state(state) }}
            />

        </div>
    )
}

export default Description;

/**
 * return (
        <div id={`tab-description`}>
            <nav>
                <Graph id={id_gene} context="gene"/>
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
 */