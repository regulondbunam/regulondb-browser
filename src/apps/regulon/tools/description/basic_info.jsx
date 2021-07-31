import React from 'react'



export default function BasicInfo({ tf }) {
    if (!tf) {
        return null
    }
    let sensingClass = tf?.sensingClass
    let connectivityClass = tf?.connectivityClass
    let synonyms = tf?.synonyms
    
    return (
        <table style={{ marginLeft: "5%", tableLayout: "fixed", width: "auto", float: "left", display: "inline-block" }}>
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
            </tbody>
        </table>
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