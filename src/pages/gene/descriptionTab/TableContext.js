import React from 'react';
import { ContextInfo } from '../../components/apollo/geneCollection'
import Modal from '../../components/ui-components/infoDisplay/Modal/Modal'
import { useHistory } from 'react-router-dom';

const TableContext = ({
    idGene
}) => {
    const context = new ContextInfo(idGene)
    const { loading, data, error } = context
    let history = useHistory();
    // console.log("info: ",idGene)

    // console.log("error: ",error)

    if (loading) {
        return <>loading...</>
    } else {
        if (error !== undefined) {
            return <>error</>
        } else {
            if (data.length > 0) {
               // console.log(data)
                return (
                    <>
                        <div style={{ width: "80%" }}>
                            <h2 style={{ color: "var(--color-accentB)", margin: "0", float: "left" }}>
                                Context &nbsp;
                    </h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Name</th>
                                        <th>PosLeft</th>
                                        <th>Pos Right</th>
                                        <th>Strand</th>
                                        <th>Notes</th>
                                        <th>Evidence and Referneces</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item) => {
                                            const evidenceReferences = item.evidenceReferences
                                            const note = item.note
                                            return (
                                                <tr key={item.name}>
                                                    <td>{item.type}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.leftEndPosition}</td>
                                                    <td>{item.rightEndPosition}</td>
                                                    <td>{item.strand}</td>
                                                    <td><Modal title={"view note"} info={note}></Modal></td>
                                                    {EvidenceReferencesDisplay(evidenceReferences)}
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                    </>
                )
            } else {
                return (
                    <>
                    </>
                )
            }
        }
    }
}

function EvidenceReferencesDisplay(evidenceReferences) {

    return evidenceReferences.map((evd) => {
        const evdref = `
            <h3>${evd.evidenceCode}</h3>
            <h1>${evd.evidenceName}</h1>
            <h2>Evidence Type: ${evd.evidenceType}</h2>
            <a href="${evd.referenceURL}" target="_blank" >View full Refence</a>
            <p>${evd.referenceCitation}</p>
        `
        return (
            <td key={evd.evidenceCode}><Modal title={evd.evidenceCode+" ("+evd.evidenceType+")"} info={evdref}></Modal></td>
        )
    })

}

export default TableContext;