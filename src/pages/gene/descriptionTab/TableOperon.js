import React from 'react';
import { OperonInfo } from '../../components/apollo/geneCollection'
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';


function TableOperon({
    idGene
}) {
    const operon = new OperonInfo(idGene)
    const advancedSearch = operon.advancedSearch
    const { data, loading, error } = useQuery(operon.query, {
        variables: { advancedSearch }
    })
    let history = useHistory();
    if (loading) {
        return <p>loading...</p>
    }
    if (error !== undefined) {
        return <p>error</p>
    }

    try {
        //console.log(data.getGenesBy.data[0].regulation.operon)
        const operonData = data.getGenesBy.data[0].regulation.operon
        const name = operonData.name
        const id = operonData.id
        const arrangement = operonData.arrangement
        return (
            <div style={{ width: "80%" }}>
                <h2 style={{ margin: "0" }}>{name}</h2>
                <h3 style={{ margin: "0", fontSize: "9px" }}>{id}</h3>
                <h3 style={{ margin: "0" }}>arrangement</h3>
                <table style={{width: "100%"}} >
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
                                    <tr key={promoter.id} className="trClickable" onClick={() => { history.push("/tu/" + tu.id) }} >
                                        <td>{
                                            tu.name
                                        }</td>
                                        <td>{
                                            `${promoter.name}`
                                        }</td>
                                        <td>{
                                            `${regulator.name}${convertType(regulator.type)}`
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
        return <>no data </>
    }


}

function convertType(type){
    switch (type) {
        case "activator":
            return "+"
        case "repressor":
            return "-"
        default:
            return ""
    }
}

export default TableOperon;