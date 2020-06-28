import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Gene from '../../components/apollo/geneCollection'
import Modal from '../../components/ui-components/infoDisplay/Modal/Modal'
import Sequence from '../../components/sequence/Sequence'

const TableGeneInfo = ({
    idGene
}) => {
    let gene = new Gene(idGene)
    const advancedSearch = gene.advancedSearch
    const { data, loading, error } = useQuery(gene.query, {
        variables: { advancedSearch }
    })

    if (loading) {
        return <p>loading...</p>
    }
    if (error) {
        return <p>error</p>
    }
    try {
        //console.log(data.getGenesBy.data[0].geneInfo)
        const geneData = data.getGenesBy.data[0].geneInfo
        const leftEndPosition = geneData["leftEndPosition"]
        const rightEndPosition = geneData["rightEndPosition"]
        const size = sizeGene(leftEndPosition, rightEndPosition)
        return (
            <div style={{ width: "80%" }}>
                <table >
                    <tbody>
                        {Object.keys(geneData).map((key, index) => {
                            const test = key.match(/^_/)
                            if (geneData[key] === null || geneData[key].length<=0) {
                                return null
                            }
                            // console.log(`${key}: ${geneData[key]}`)
                            // console.log(geneData[key])
                            if (test === null) {
                                switch (key) {
                                    case 'leftEndPosition':
                                        return GenomePosition(size, leftEndPosition, rightEndPosition)
                                    case 'rightEndPosition':
                                        return null
                                    case 'sequence':
                                        return sequenceGene(geneData['name'], geneData[key], key)
                                    case 'gcContent':
                                        return (
                                            <tr key={key}>
                                                <td style={{ fontWeight: "bold" }}>{key}</td>
                                                <td dangerouslySetInnerHTML={{ __html: `${geneData[key]}%` }}></td>
                                            </tr>
                                        )
                                    default:
                                        return (
                                            <tr key={key}>
                                                <td style={{ fontWeight: "bold" }}>{key}</td>
                                                <td dangerouslySetInnerHTML={{ __html: geneData[key] }}></td>
                                            </tr>
                                        )
                                }
                            }
                            return null
                        })
                        }
                    </tbody>
                </table>
            </div>
        )
    } catch (error) {
        console.log(error)
        return <>catch err</>
    }

}

function GenomePosition(size, leftEndPosition, rightEndPosition) {
    return (
        <tr key={size}>
            <td style={{ fontWeight: "bold" }}>Genome position(nucleotides):</td>
            <td>{`${leftEndPosition} --> ${rightEndPosition} size: ${size}bp `}</td>
        </tr>
    )
}

function sizeGene(leftEndPosition, rightEndPosition) {
    if (typeof (leftEndPosition) === 'number' && typeof (rightEndPosition) === 'number') {
        return rightEndPosition - leftEndPosition + 1
    }
    return 0
}

function sequenceGene(gene, sequence, key) {
    return (
        <tr key={key}>
            <td style={{ fontWeight: "bold" }}>{key}</td>
            <td className="sequence" >
                <Modal title={"Fasta Format"} info={Sequence(gene, sequence, "fasta")}></Modal>
                <Modal title={"genbank Format"} info={Sequence(gene, sequence, "genbank")}></Modal>
                </td>
        </tr>
    )
}

//dangerouslySetInnerHTML={{ __html: sequenceF}}
export default TableGeneInfo;