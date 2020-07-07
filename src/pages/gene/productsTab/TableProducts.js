import React from 'react';
import { GeneProducts } from '../../components/apollo/GeneCollection';
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
    //console.log(data)
    //console.log(error)
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
                                <h2 dangerouslySetInnerHTML={{ __html: product.name }} style={{ margin: '0' }}/>
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
                        if (key === 'motifs') {
                            //console.log('motif')
                            return Motifs(motifE)
                        }
                        if (product[key] === null || product[key].length <= 0 || test !== null) {
                            return null
                        }
                        switch (key) {
                            case "name":
                                return null
                            case "motifs":
                                return Motifs(motifE)
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

const motifE = [
    {
        leftEndPosition: 1234,
        rightEndPosition: 5632,
        sequence: "ESNITSTLNISQQTLKIQKF",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        type: "alF",
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        leftEndPosition: 1234,
        rightEndPosition: 5632,
        sequence: "HKNSQLCFSHNQFKIMQLILKNKNESNITSTLNISQQTLKIQKFNIMYKLKLRRMSDIVTLGITSY",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        type: "alF",
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
]

function Motifs(motifs) {
    return (
        <React.Fragment key={"showMotifs"}>
            <tr >
                <td colSpan="2" style={{ fontWeight: "bold", backgroundColor: "#D5D5D7" }}>Motifs:</td>
            </tr>
            <tr>
                <td colSpan="2">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: "#D5D5D7" }}>Type</th>
                                <th style={{ backgroundColor: "#D5D5D7" }}>Position</th>
                                <th style={{ backgroundColor: "#D5D5D7" }}>Sequence</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            motifs.map((motif) => {
                                return <tr key={motif.sequence}>
                                    <td>{motif.type}</td>
                                    <td>{`${motif.leftEndPosition}-->${motif.rightEndPosition}`}</td>
                                    <td dangerouslySetInnerHTML={{ __html: motif.sequence }}></td>
                                </tr>
                            })
                        }
                    </tbody>
                    </table> 
                </td>
            </tr>
        </React.Fragment>
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