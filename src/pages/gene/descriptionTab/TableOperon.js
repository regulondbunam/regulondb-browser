import React from 'react';
import { OperonInfo } from '../../components/apollo/geneCollection'
import { useHistory } from 'react-router-dom';

const TableOperon = ({
    idGene
}) => {
    let operon = new OperonInfo(idGene)
    const { loading, data, error } = operon
    let history = useHistory();
    // console.log("info: ",idGene)

    // console.log("error: ",error)

    if (loading) {
        return <>loading...</>
    } else {
        if (error !== undefined) {
            return <>error</>
        } else {
            try {
                const name = data.name
                const id = data.id
                //console.log("data: ", data.arrangement)
                const arrangement = data.arrangement
                return (
                    <div style={{ width: "80%" }}>
                        <h2 style={{ color: "var(--color-accentB)", margin: "0", float: "left" }}>
                            Operon &nbsp;
                       </h2>
                        <h2 style={{ margin: "0" }}>{name}</h2>
                        <h3 style={{ margin: "0", fontSize: "9px" }}>{id}</h3>
                        <h3>arrangement:</h3>
                        <table >
                            <thead>
                                <tr>
                                    <th>Promoter</th>
                                    <th>Regulator</th>
                                    <th>TranscriptionUnit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    arrangement.map((item) => {
                                        //console.log("item: ", item)
                                        const promoter = item.promoter
                                        const regulator = item.regulator
                                        const tu = item.transcriptionUnit
                                        return (
                                            <tr key={promoter.id}  >
                                                <td className="trClickable" onClick={() => { history.push("/promoter/" + promoter.id) }}>{
                                                    `${promoter.name}`
                                                }</td>
                                                <td className="trClickable" onClick={() => { history.push("/regulator/" + regulator.id) }}>{
                                                    `${regulator.name} - ${regulator.type}`
                                                }</td>
                                                <td className="trClickable" onClick={() => { history.push("/tu/" + tu.id) }}>{
                                                    tu.name
                                                }</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                )
            } catch (error) {
                return <> no data </>
            }
        }
    }
}

export default TableOperon;