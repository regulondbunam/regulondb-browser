import React from 'react'

export const RBSbyStite = ({ data }) => {
    console.log(data)
    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th style={tbTitle} colSpan="4" >Binding Sites</th>
                </tr>
                <tr>
                    <th style={thStyle} >Type</th>
                    <th style={thStyle} >Transcription Factor</th>
                    <th style={thStyle} >Function</th>
                    <th style={thStyle} >Promoter</th>
                    <th style={thStyle} >LeftPos</th>
                    <th style={thStyle} >RightPos</th>
                    <th style={thStyle} >Central Rel-Pos</th>
                    <th style={thStyle} >Sequence</th>
                    <th style={thStyle} >Growth Conditions</th>
                    <th style={thStyle} >Evidence and References</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((bs, index) => {
                        return (
                            <tr key={`tr-bs-${index}-${bs.sequence}`}>
                                <td>{bs?.type}</td>
                                <td>{bs["Transcription Factor"]}</td>
                                <td>{bs?.Function}</td>
                                <td>{bs?.Promoter}</td>
                                <td>{bs?.LeftPos}</td>
                                <td>{bs?.RightPos}</td>
                                <td>{bs["Central Rel-Pos"]}</td>
                                <td>{bs?.sequence}</td>
                                <td>{bs["Growth Conditions"]}</td>
                                <td>{bs["Evidence References"]}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

const thStyle = { fontWeight: "bold" }

const tbTitle = {
    fontWeight: "bold",
    borderBottom: "1px solid #72A7C7",
    textAlign: "inherit",
}