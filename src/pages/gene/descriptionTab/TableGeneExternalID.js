import React from 'react';
import { ExternalDataBases } from '../../components/apollo/geneCollection'
//import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

const TableGeneExternalID = ({
    idGene
}) => {
    const exId = new ExternalDataBases(idGene)
    const advancedSearch = exId.advancedSearch
    const { data, loading, error } = useQuery(exId.query, {
        variables: { advancedSearch }
    })
    if(loading){
        return <>Loading...</>
    }
    if(error){
        console.log(error)
        return <>error server</>
    }
    try {
        //console.log(data.getGenesBy.data[0].geneInfo.externalCrossReferences)
        const exCR = data.getGenesBy.data[0].geneInfo.externalCrossReferences
        return ( 
            <>
            <table>
                <thead>
                    <tr>
                        <th>External Data Bases</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        exCR.map((item)=>{
                            return(
                                <tr key={`${item.url}`}>
                                    <td>
                                    <a  href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            </>
         );
    } catch (error) {
        return ( 
            <>clientError</>
         );
    }
    
}
 
export default TableGeneExternalID;