import React from 'react';
import { ShineDalgarno } from '../../components/apollo/geneCollection'
import { useQuery } from '@apollo/react-hooks';
//import Modal from '../../components/ui-components/infoDisplay/Modal/Modal'
//import Sequence from '../../components/sequence/Sequence'

//
const TableShineDalgarno = ({
    idGene
}) => {
    const sd = new ShineDalgarno(idGene)
    const advancedSearch = sd.advancedSearch
    const { data, loading, error } = useQuery(sd.query, {
        variables: { advancedSearch }
    })
    if (loading) {
        return <>Loading...</>
    } 
    if (error) {
            return <>Error server</>
        }
    try {
        const sdData=data.getGenesBy.data[0].shineDalgarno
        //console.log(sdData)
        if (sdData.length > 0) {
            return (
                <>
                    <div style={{ width: "80%" }}>
                        {
                            <table>
                                <tbody>
                                    {sdData.map((item) => {
                                        return (
                                            <React.Fragment key={item.leftEndPosition}>
                                                <tr >
                                                    <th>Distance to gene</th>
                                                    <th>Left Position</th>
                                                    <th>Right Position</th>
                                                </tr>
                                                <tr>
                                                    <td>{item.distanceToGene}</td>
                                                    <td>{item.leftEndPosition}</td>
                                                    <td>{item.rightEndPosition}</td>
                                                </tr>
                                                <tr>
                                                    <td className="sequence" colSpan="3">{item.sequence}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="3">{item.note}</td>
                                                </tr>
                                            </React.Fragment>
                                        )
                                    })}
                                </tbody>
                            </table>
                        }
                    </div>
                </>
            )
        }
        return(
            <></>
        )
        
    } catch (error) {
        console.log(error)
        return <>query error</>
    }

}

export default TableShineDalgarno;

/*
    
 */