import React from 'react'

const thStyle = {
    fontWeight: "bold",
    borderBottom: "1px solid #72A7C7",
    textAlign: "inherit",
}

export default function BasicInfo({ tf }) {
    if (!tf) {
        return null
    }
    let sensingClass = tf?.sensingClass
    let connectivityClass = tf?.connectivityClass
    let synonyms = tf?.synonyms
    let conformations = tf?.conformations
    return (
        <table style={{ tableLayout: "fixed", width: "auto", float: "left", display: "inline-block" }}>
            <tbody>
                {
                    CheckArrayS(synonyms)
                }
                {
                    sensingClass
                        ? <tr>
                            <td style={{ fontWeight: "bold" }}>
                                Sensing Class
                            </td>
                            <td>
                                {sensingClass}
                            </td>
                        </tr>
                        : null
                }
                {
                    connectivityClass
                        ? <tr>
                            <td style={{ fontWeight: "bold" }}>
                                Connectivity Class
                            </td>
                            <td>
                                {connectivityClass}
                            </td>
                        </tr>
                        : null
                }
                {
                    Conformations(conformations)
                }
            </tbody>
        </table>
    )
}


function Conformations(conformations) {
    if(!conformations){
        return null
    }
    if(conformations.length === 0){
        return null
    }
    return(
        <tr >
            <td style={{ fontWeight: "bold" }}>Conformations</td>
            <td>
                <table>
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
            </td>
        </tr>
    )
}

function CheckArrayS(array = []) {
    if(!array){
        return null
    }
    if(array.length === 0){
        return null
    }
    return (
        <tr>
            <td style={{ fontWeight: "bold" }}>Synonyms:</td>
            <td>{array.join(", ")}</td>
        </tr>
    )
}