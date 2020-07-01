import React from 'react';
import TableProducts from './productsTab/TableProducts'

const GeneProducts = ({
    geneID
}) => {
    return ( 
        <>
        <h1>Product information</h1>
        <TableProducts idGene={geneID} />
        </>
     );
}
 
export default GeneProducts;