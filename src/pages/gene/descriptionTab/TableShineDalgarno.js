import React from 'react';
import { ShineDalgarno } from '../../components/apollo/geneCollection'
import Modal from '../../components/ui-components/infoDisplay/Modal/Modal'
import Sequence from '../../components/sequence/Sequence'

const TableShineDalgarno = ({
    idGene
}) => {
    let sd = new ShineDalgarno(idGene)
    const { loading, data, error } = sd
    if (loading) {
        return (
            <>Loading...</>
        )
    } else {
        if (error !== undefined) {
            return (
                <>Error</>
            )
        } else {
            if (data.length > 0) {
                return (
                    <>
                        <div style={{ width: "80%" }}>
                            {
                                <table>
                                    <tbody>
                                        {data.map((item) => {
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
        }
    }
    return (
        <>
        </>
    );
}

export default TableShineDalgarno;