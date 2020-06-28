import React from 'react';
import { ContextInfo } from '../../components/apollo/geneCollection'
import Modal from '../../components/ui-components/infoDisplay/Modal/Modal'
//import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

const TableContext = ({
    idGene
}) => {
    const context = new ContextInfo(idGene)
    const advancedSearch = context.advancedSearch
    const { data, loading, error } = useQuery(context.query, {
        variables: { advancedSearch }
    })
    //let history = useHistory();

    if (loading) {
        return <>loading...</>
    }
    if (error !== undefined) {
        return <>error</>
    }
    try{
        //console.log(data.getGenesBy.data[0].regulation.context)
        const contextData =  data.getGenesBy.data[0].regulation.context
        if(contextData.length>0){
            return(
                <div style={{ width: "80%" }}>
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
                                contextData.map((item) => {
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
            )
        }
        return <></>
    }catch(error){
        return(
            <>query error</>
        )
    }

}

function EvidenceReferencesDisplay(evidenceReferences) {

    return evidenceReferences.map((evd) => {
        const evdref = `
            <h2>Evidence</h1>
            <h1>${evd.evidenceCode} ${evd.evidenceName}</h1>
            <h2>Type: ${evd.evidenceType}</h2>
            <h2>Reference:</h2>
            <h2><a href="${evd.referenceURL}" target="_blank" >View Refence</a></h2>
            <p class="citation">${evd.referenceCitation}</p>
        `
        return (
            <td key={evd.evidenceCode}><Modal title={evd.evidenceCode + " (" + evd.evidenceType + ")"} info={evdref}></Modal></td>
        )
    })

}

export default TableContext;