import React from 'react';
import TabGC from './growthConditionsTab/TabGrowthConditions'

const GeneReferences = ({
    geneID
}) => {
    return ( 
        <>
        <article>
        <h1>Growth Conditions</h1>
        <TabGC idGene={geneID}/>
        </article>
        <aside>
            
        </aside>
        </>
     );
}
 
export default GeneReferences;