import React from 'react'

const thStyle = {
    fontWeight: "bold",
    borderBottom: "1px solid #72A7C7",
    textAlign: "inherit",
}

export default function Conformations({tf}) {
    console.log(tf?.conformations)
    let conformations = tf?.conformations

    if(!conformations){
        return null
    }
    if(conformations.length === 0){
        return null
    }
    return(
        <div>
            <h3>Conformations</h3>
            <table style={{marginLeft: "5%"}}>
                    <thead>
                        <tr>
                            <th style={thStyle} >Name</th>
                            <th style={thStyle} >Type</th>
                            <th style={thStyle} >Effector Interaction Type</th>
                            <th style={thStyle} >Functional Type</th>
                            <th style={thStyle} >Evidence and References</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            conformations.map(c =>{
                                return(
                                    <tr>
                                        <td>{c?.name}</td>
                                        <td>{c?.type}</td>
                                        <td>{c?.effectorInteractionType}</td>
                                        <td>{c?.functionalType}</td>
                                        <td>evi</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
        </div>
    )
}
