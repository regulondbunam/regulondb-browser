import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
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
    //console.log(size)
    //console.log("data: ",data)
    if (loading) {
        //const state = "Loading"
        return (
            <>
            loading...
            </>
        );
    } 
    else{
        if(error !== undefined){
            return <>error</>
        }else{
            try {
                console.log(data)
                const leftEndPosition = data["leftEndPosition"]
                const rightEndPosition = data["rightEndPosition"]
                const size = sizeGene(leftEndPosition,rightEndPosition)
                return (
                    <div style={{ width: "80%" }}>
                        <table >
                            <tbody>
                                {Object.keys(data).map((key, index) => {
                                    const test = key.match(/^_/)
                                    if(test === null){
                                        switch (key) {
                                            case 'leftEndPosition':
                                                return GenomePosition(size,leftEndPosition,rightEndPosition)
                                            case 'rightEndPosition':
                                                return null
                                            case 'sequence':
                                                return sequenceGene(data['name'],data[key], key)
                                            default:
                                                return (
                                                    <tr key={key}>
                                                        <td style={{fontWeight: "bold"}}>{key}</td>
                                                        <td dangerouslySetInnerHTML={{ __html:   data[key]}}></td>
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
    }
}


function GenomePosition(size,leftEndPosition,rightEndPosition){
    return (
        <tr key={size}>
            <td style={{fontWeight: "bold"}}>Genome position(nucleotides):</td>
            <td>{`size: ${size}, position: ${leftEndPosition} --> ${rightEndPosition}`}</td>
        </tr>
    )
}

function sizeGene(leftEndPosition,rightEndPosition){
    if(typeof(leftEndPosition) === 'number' && typeof(rightEndPosition) === 'number'){
        return rightEndPosition - leftEndPosition + 1
    }
    return 0
}

function sequenceGene(gene, sequence, key){
    return (
        <tr key={key}>
            <td style={{fontWeight: "bold"}}>{key}</td>
            <td className="sequence" ><Modal title={"Get nucleotide sequence"} info={Sequence(gene,sequence,"fasta")}></Modal></td>
        </tr>
    )
}

//dangerouslySetInnerHTML={{ __html: sequenceF}}
export default TableGeneInfo;