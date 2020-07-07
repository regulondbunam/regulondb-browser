import React from 'react';
import TableProducts from './productsTab/TableProducts'

const GeneProducts = ({
    geneID
}) => {
    return ( 
        <>
        <article>
        <h1>Product information</h1>
        <TableProducts idGene={geneID} />
        </article>
        <aside>
            
        </aside>
        </>
     );
}
 
export default GeneProducts;