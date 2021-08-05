import React from 'react'

export default function Interaction({
    r = {type: "", name:""},
    re = {type: "", name:""}
}) {
    return (
        <tabel style={{marginLeft: "5%"}}>
            <thead>
                <tr className="tableContent-th-subtitle">
                    <th>Regulator</th>
                    <th>Regulated Entity</th>
                </tr>
            </thead>
            <tbody >
                <tr>
                    <td>{r?.name}</td>
                    <td>{re?.name}</td>
                </tr>
                <tr>
                    <td>{r?.type}</td>
                    <td>{re?.type}</td>
                </tr>
            </tbody>
        </tabel>
    )
}
