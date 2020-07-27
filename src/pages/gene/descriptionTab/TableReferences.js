import React from 'react';
import { EvidenceReferences } from '../../components/apollo/GeneCollection'
import ModalER from '../../components/utiles/ModalEvidenceRef'
import { useQuery } from '@apollo/react-hooks';

const TableReferences = ({
    idGene,
    showHeadTable = false,
}) => {
    const eR = new EvidenceReferences(idGene)
    const advancedSearch = eR.advancedSearch
    const { data, loading, error } = useQuery(eR.query, {
        variables: { advancedSearch }
    })
    if (loading) { return <>Loading...</> }
    if (error) {
        console.log(error)
        return <>server error...</>
    }
    try {
        console.log(data.getGenesBy.data[0].geneInfo.evidenceReferences)
        const eviRef = data.getGenesBy.data[0].geneInfo.evidenceReferences
        return (
            <>
                <table>
                    {
                        showHeadTable
                            ? <thead>
                                <tr>
                                    <th>
                                        Gene Evidence and References
                                    </th>
                                </tr>
                            </thead>
                            : null
                    }
                    <tbody>
                        {
                            eviRef.map((evi) => {
                                return (
                                    <tr key={evi.referenceCitation} className="trClickable">
                                        <td><ModalER classNameModal="citation" title={evi.referenceCitation} evidenceReference={evi} /></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </>
        );
    } catch (error) {
        console.log(error)
        return <>client error...</>
    }
}

export default TableReferences;