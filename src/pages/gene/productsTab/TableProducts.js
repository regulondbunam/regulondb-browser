import React from 'react';
import { GeneProducts } from '../../components/apollo/geneCollection';
import { useQuery } from '@apollo/react-hooks';
import Modal from '../../components/ui-components/infoDisplay/Modal/Modal';
import Sequence from '../../components/sequence/Sequence';

const TableProducts = ({
    idGene
}) => {
    const productsS = new GeneProducts(idGene)
    const advancedSearch = productsS.advancedSearch
    const { data, loading, error } = useQuery(productsS.query, {
        variables: { advancedSearch }
    })
    console.log(data)
    console.log(error)
    if (loading) { return <>Loading...</> }
    if (error) { return <>Server error </> }
    try {
        const products = data.getGenesBy.data[0].products
        return (
            <>
                {
                    products.map((product) => {
                        return (
                            <div style={{ width: "80%" }} key={product.name}>
                                <h2 style={{margin: '0'}}>{product.name}</h2>
                                {TableProductInfo(product)}
                            </div>
                        )
                    })
                }
            </>
        )

    } catch (error) {
        return (
            <>
                Client error
            </>
        );
    }

}

function TableProductInfo(product) {
    return (
        <table key={`${product.name}-tableInfo`}>
            <tbody>
                {
                    Object.keys(product).map((key, index) => {
                        const test = key.match(/^_/)
                        if (product[key] === null || product[key].length <= 0 || test !== null) {
                            return null
                        }
                        switch (key) {
                            case "name":
                                return null
                            case "motifs":
                                return null
                            case 'externalCrossReferences':
                                return null
                            case 'evidenceReferences':
                                return null
                            case 'sequence':
                                return sequence(product['name'], product[key], key)
                            default:
                                return (
                                    <tr key={`${product.name}-trInfo-${key}`}>
                                        <td style={{ fontWeight: "bold" }}>{`${key}:`}</td>
                                        <td dangerouslySetInnerHTML={{ __html: product[key] }}></td>
                                    </tr>
                                )
                        }
                    })
                }
            </tbody>
        </table>
    )
}

function sequence(gene, sequence, key) {
    return (
        <tr key={`${key}-Sequence`}>
            <td style={{ fontWeight: "bold" }}>{`${key}:`}</td>
            <td className="sequence" >
                <Modal className="aBase" title={"Fasta Format"} info={Sequence(gene, sequence, "fasta")}></Modal>
                <Modal className="aBase" title={"genbank Format"} info={Sequence(gene, sequence, "genbank")}></Modal>
            </td>
        </tr>
    )
}

export default TableProducts;