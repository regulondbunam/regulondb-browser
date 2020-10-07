import React from 'react';
import { useQuery } from '@apollo/react-hooks';
//import citsSearch from '../../../components/utiles/citsSearch'
import AllCitations from '../../../components/cits/Cits'
import Querys from '../../../components/apollo/querys/GeneQuerys'
import { GetPhrase } from '../../../components/apollo/querys/PhraseQuerys'
import Modal from '../../../components/ui-components/infoDisplay/modal/Modal'
import Sequence from '../../../components/sequence/Sequence'
import Phrase from '../../../components/phrases/Phrase'
import ToolTip from '../../../components/ui-components/infoDisplay/toolTip/ToolTip'


const TableGeneInfo = ({
    allCitations = [],
    idGene
}) => {
    const query = new Querys(idGene)
    const phrase = new GetPhrase(idGene)
    const id = phrase.id
    const { data, loading, error } = useQuery(query.queryGeneInfo(idGene))
    const pharaseData = useQuery(phrase.query, {
        skip: !data,
        variables: { id }
    })

    if (loading || pharaseData.loading) {
        return <p>loading...</p>
    }
    if (error) {
        return <p>error</p>
    }
    try {
        //console.log(pharaseData.data.getPhraseOf[0])
        //console.log(data.getGenesBy.data[0].geneInfo)
        let Genephrase = {}
        let phraseProps = []
        try {
            Genephrase = pharaseData.data.getPhraseOf[0]
            phraseProps = Genephrase.properties
        } catch (error) {
            //console.log("no phrase data")
        }

        const geneData = data.getGenesBy.data[0].gene
        const multifun = geneData.multifunTerms
        const citations = geneData.citations
        const note = geneData.note
        const products = data.getGenesBy.data[0].products
        const leftEndPosition = geneData["leftEndPosition"]
        const rightEndPosition = geneData["rightEndPosition"]
        const size = sizeGene(leftEndPosition, rightEndPosition)
        //console.log(geneData)
        return (
            <div style={{ width: "80%" }}>
                <table >
                    <tbody>
                        {Object.keys(geneData).map((key, index) => {
                            const test = key.match(/^_/)
                            if (geneData[key] === null || geneData[key].length <= 0) {
                                return null
                            }
                            // console.log(`${key}: ${geneData[key]}`)
                            // console.log(geneData[key])
                            if (test === null) {
                                switch (key) {
                                    case 'leftEndPosition':
                                        const phraseL = findInArray('leftEndPosition', phraseProps)
                                        const phraseR = findInArray('rightEndPosition', phraseProps)
                                        return GenomePosition(size, leftEndPosition, rightEndPosition, phraseL, phraseR)
                                    case 'rightEndPosition':
                                        return (
                                            <tr key={key}>
                                                <td style={{ fontWeight: "bold" }}>size:</td>
                                                <td dangerouslySetInnerHTML={{ __html: `${size}bp` }}></td>
                                            </tr>
                                        )
                                    case 'sequence':
                                        return (sequenceGene(geneData['name'], geneData[key], key, "gene", true))
                                    case 'gcContent':
                                        return (
                                            <tr key={key}>
                                                <td style={{ fontWeight: "bold" }}>{`${key}:`}</td>
                                                <td dangerouslySetInnerHTML={{ __html: `${geneData[key]}%` }}></td>
                                            </tr>
                                        )
                                    case 'strand':
                                        return (
                                            <tr key={key}>
                                                <td style={{ fontWeight: "bold" }}><ToolTip tip='strand'>{`${key}:`}</ToolTip></td>
                                                <td> <Phrase style={{ float: "left", margin: "0" }} phraseData={phraseTest} term={geneData[key]} /></td>
                                            </tr>

                                        )
                                    case 'citations':
                                    case 'note':
                                    case 'multifunTerms':
                                        return null
                                    default:
                                        //console.log(`key:${key}_${typeof(geneData[key])}`)
                                        return (
                                            <tr key={key}>
                                                <td style={{ fontWeight: "bold" }}><ToolTip tip={`termino hola esta es una descripcion con muchas palabras nose que mas poner xD ${key}`} >{`${key}:`}</ToolTip></td>
                                                <td dangerouslySetInnerHTML={{ __html: geneData[key] }}></td>
                                            </tr>
                                        )
                                }
                            }
                            return null
                        })
                        }
                        {
                            products.length > 0 ? ShowProducts(products, idGene) : null
                        }
                        {
                            multifun.length > 0 ? ShowMultifunTerms(multifun) : null
                        }
                        {
                            note?ShowNote(note, allCitations):null
                        }
                        {
                            citations.length > 0 ? ShowCitations(note, citations, allCitations) : null
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

function findInArray(propertie, properties) {
    return properties.find(element => element.name === propertie)
}

function ShowNote(note, allCitations){
    return (
        <tr>
                        {
                            note
                            ? <td style={{ fontWeight: "bold" }}>note:</td>
                            : null
                        }
                        {
                            note
                            ?<td dangerouslySetInnerHTML={{ __html: note }} />
                            :null
                        }
                        </tr>
    )
}

function ShowCitations(note, citations, allCitations) {
    //console.log(citations)
    //console.log(note)
    //citsSearch(allCitations, citations, note)
    return (
        <tr>
            <td colSpan="2">
                {AllCitations(citations)}
            </td>
        </tr>
    )
}

function ShowMultifunTerms(multifun) {
    //console.log(multifun)
    return (
        <tr>
            <td style={{ fontWeight: "bold" }}>MultifunTerms:</td>
            <td>
                <table>
                    <tbody>

                        {
                            multifun.map((fun) => {
                                return (
                                    <React.Fragment key={fun.id} >
                                        <tr style={{ fontWeight: "bold" }} dangerouslySetInnerHTML={{ __html: fun.name }} />
                                        <tr dangerouslySetInnerHTML={{ __html: fun.label }} />
                                    </React.Fragment>
                                )
                            })
                        }
                    </tbody>
                </table>
            </td>
        </tr>
    )
}

function ShowProducts(products, idGene) {
    return (
        <tr>
            <td style={{ fontWeight: "bold" }}>products:</td>
            <td>
                {
                    products.map((product) => {
                        return (
                            <p key={`${products.name}-infoTable`} className="aBase">{product.name}</p>
                        )
                    })
                }
            </td>
        </tr>
    )
}

function GenomePosition(size, leftEndPosition, rightEndPosition, phraseL, phraseR) {
    //console.log(phraseR)
    return (
        <tr key={size}>
            <td style={{ fontWeight: "bold" }}>genome position(nucleotides):</td>
            <td className="phraseContent">
                <Phrase style={{ float: "left", margin: "0" }} phraseData={phraseL} term={leftEndPosition} />
                <p style={{ float: "left", margin: "0" }}>&nbsp;{"-->"}&nbsp;</p>
                <Phrase style={{ float: "left", margin: "0" }} phraseData={phraseR} term={rightEndPosition} />
            </td>
        </tr>
    )
}

function sizeGene(leftEndPosition, rightEndPosition) {
    if (typeof (leftEndPosition) === 'number' && typeof (rightEndPosition) === 'number') {
        return rightEndPosition - leftEndPosition + 1
    }
    return 0
}

function sequenceGene(gene, sequence, key, header, countElements) {
    return (
        <tr key={key}>
            <td style={{ fontWeight: "bold" }}>{`${key}:`}</td>
            <td className="sequence" >
                <Modal className="aBase" title={"Fasta Format"} info={Sequence(gene, sequence, "fasta", "gene", true)}></Modal>
                <Modal className="aBase" title={"genbank Format"} info={Sequence(gene, sequence, "genbank", "gene", true)}></Modal>
            </td>
        </tr>
    )
}

//dangerouslySetInnerHTML={{ __html: sequenceF}}
export default TableGeneInfo;

const phraseTest = {
    name: "Hi! i'm a phrase",
    value: 1234,
    pmid: '1232123',
    phrases: [
        { phrase: "Hi i'm a first phrase", phraseID: "RDBPHRASESA0007", evidence: "EV-COMP" },
        { phrase: "Hi i'm a second phrase", phraseID: "RDBPHRASESA0007", evidence: "EV-COMP" },
        { phrase: "Hi i'm a other phrase", phraseID: "RDBPHRASESA0007", evidence: "EV-COMP" },
        { phrase: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", phraseID: "RDBPHRASESA0007", evidence: "EV-COMP" },
    ]
}