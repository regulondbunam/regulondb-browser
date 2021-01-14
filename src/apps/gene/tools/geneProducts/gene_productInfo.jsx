import React from 'react';
import ModalER from '../../../../components/ui-components/web/components/utiles/ModalEvidenceRef'
import Modal from '../../../../components/ui-components/output/modal/Modal';
import Sequence from '../../../../components/ui-components/web/components/sequence/Sequence';
import AllCitations from '../../../../components/cits/Cits'
import Notes from '../../../../components/cits/Notes'
import ReactTooltip from 'react-tooltip'


export function TableProductInfo(product,allCitations) {
    const citations = product?.citations
    return (
        <table key={`${product.name}-tableInfo`} id={`${product.id}`} style={{width: 'auto'}} >
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
                                return Motifs(product['motifs'])
                            case 'externalCrossReferences':
                                return null
                            case 'evidenceReferences':
                                return (
                                    <React.Fragment key={`${key}_${product['name']}`}>
                                        <br />
                                        <tr><th colSpan="2">{`${product['name']} Evidence and References`}</th></tr>
                                        {
                                            product[key].map((evi) => {
                                                return (
                                                    <tr key={evi.referenceCitation} className="trClickable">
                                                        <td colSpan="2"><ModalER classNameModal="citation" title={evi.referenceCitation} evidenceReference={evi} /></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </React.Fragment>
                                )
                            case 'sequence':
                                return (
                                    <tr key={`${product.name}-trInfo-${key}`}>
                                        <td style={{ fontWeight: "bold" }}>{`${key}:`}</td>
                                        <td>
                                        {
                                            sequence(product['name'], product[key])
                                        }
                                        </td>
                                    </tr>
                                )
                            case 'note':
                                return(
                                    <tr key={`${product.name}-trInfo-${key}`}>
                                        <td style={{ fontWeight: "bold" }}>{`${key}:`}</td>
                                        <td>
                                            <div dangerouslySetInnerHTML={{__html: Notes(allCitations,product[key])}} />
                                        <ReactTooltip place="bottom" type="light" border={true} />
                                        </td>
                                    </tr>
                                )
                            case 'citations':
                                return null
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
                {
                            citations.length > 0 ? ShowCitations( citations, allCitations) : null
                        }
            </tbody>
        </table>
    )
}

function ShowCitations(citations, allCitations) {
    //console.log(citations)
    //console.log(note)
    //citsSearch(allCitations, citations, note)
    return (
        <tr>
            <td style={{ fontWeight: "bold" }}>evidences and references:</td>
            <td>
                {AllCitations(citations)}
            </td>
        </tr>
    )
}

function Motifs(motifs) {
    return (
        <React.Fragment key={"showMotifs"}>
            <tr >
                <td style={{ fontWeight: "bold" }} colSpan="2" >Motifs:</td>
            </tr>
            <tr>
                <td colSpan="2">
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Position</th>
                                <th>Sequence</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                motifs.map((motif, idex) => {
                                    return <tr key={`${motif.sequence}-${idex}`} className="tableContent_td_content">
                                        <td>{motif.type}</td>
                                        <td>{`${notNull(motif.leftEndPosition)}-->${notNull(motif.rightEndPosition)}`}

                                        </td>
                                        <td>{
                                            motif.sequence.length > 10
                                                ? sequence(motif.position, motif.sequence, 'view sequence')
                                                : motif.sequence
                                        }</td>
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

function sequence(gene, sequence) {
    return (
        <div>
            <Modal className="aBase" title={"Fasta Format"} info={Sequence(gene, sequence, "fasta")}></Modal>
            <Modal className="aBase" title={"genbank Format"} info={Sequence(gene, sequence, "genbank")}></Modal>
        </div>
    )
}

function notNull(data){
    if(data){
        return data
    }
    return("")
}