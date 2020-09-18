import React from 'react';
import {TableProductInfo} from './productsTab/TableProducts'
import TableProductExternalID from './productsTab/TableProductExternalID'
import { GeneProducts } from '../../components/apollo/querys/GeneQuerys';
import { useQuery } from '@apollo/react-hooks';

const GeneProduct = ({
    geneID
}) => {
    const productsS = new GeneProducts(geneID)
    const advancedSearch = productsS.advancedSearch
    const { data, loading, error } = useQuery(productsS.query, {
        variables: { advancedSearch }
    })
    //console.log(data)
    //console.log(error)
    if (loading) { return <>Loading...</> }
    if (error) { return <>Server error </> }
    try {
        const products = data.getGenesBy.data[0].products
        return (
            <>
            <article>
            <h2>Product information</h2>
            </article>
                {
                    products.map((product) => {
                        return (
                            <React.Fragment key={product.name} >
                                <article >
                                <h3 dangerouslySetInnerHTML={{ __html: product.name }} style={{ margin: '0' }}/>
                                {TableProductInfo(product)}
                            </article>
                             <aside>
                                 <TableProductExternalID externalCrossReferences={product.externalCrossReferences} />
                             </aside>
                            </React.Fragment>
                            
                        )
                    })
                }
            </>
        )
    } catch (error) {
        console.log(error)
        return <></>
    }
    
}
 
export default GeneProduct;