import React from 'react';
import { OperonInfo } from '../../components/apollo/geneCollection'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useHistory } from 'react-router-dom';


function TableOperon({
    idGene
}){
    const operon = new OperonInfo(idGene)
    const advancedSearch = operon.advancedSearch
    const { data, loading, error } = useQuery(operon.query, {
        variables: { advancedSearch }
      })
    let history = useHistory();
    console.log("operon")
    if (loading) {
        return <>loading...</>
    } else {
        if (error !== undefined) {
            return <>error</>
        } else {
            try {
                //console.log(data.getGenesBy.data[0].regulation.operon)
                const operonData = data.getGenesBy.data[0].regulation.operon
                const name = operonData.name
                const id = operonData.id
                //console.log("operonData: ", operonData.arrangement)
                const arrangement = operonData.arrangement
                return (
                    <div style={{ width: "80%" }}>
                        <h2>
                            Operon &nbsp;
                       </h2>
                        <h2 style={{ margin: "0" }}>{name}</h2>
                        <h3 style={{ margin: "0", fontSize: "9px" }}>{id}</h3>
                        <h3 style={{ margin: "0" }}>arrangement</h3>
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