import React from 'react';
import TabGC from './growthConditionsTab/TabGrowthConditions'

const GeneReferences = ({
    geneID
}) => {
    return ( 
        <>
        <article>
        <TabGC idGene={geneID}/>
        </article>
        <aside>
            
        </aside>
        </>
     );
}
 
export default GeneReferences;