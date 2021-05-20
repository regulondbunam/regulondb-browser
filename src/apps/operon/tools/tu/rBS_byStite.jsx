import React from 'react'

export const RBSbyStite = ({ data }) => {
    console.log(data)
    const bss = data?.promoter
    if (bss.length > 0) {
        return (
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th style={tbTitle} colSpan="4" >Binding Sites</th>
                    </tr>
                    <tr>
                        <th style={thStyle} >Function</th>
                        <th style={thStyle} >LeftPos</th>
                        <th style={thStyle} >RightPos</th>
                        <th style={thStyle} >Absolute Position</th>
                        <th style={thStyle} >Sequence</th>
                        <th style={thStyle} >Evidence and References</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bss.map((bs,index)=>{
                            const rs = bs?.regulatorySite
                            return(
                                <tr key={`tr-bs-${index}-${bs?.regulatorySite?.sequence}`} >
                                    <td>{bs?.function}</td>
                                    <td>{rs?.leftEndPosition}</td>
                                    <td>{rs?.rightEndPosition}</td>
                                    <td>{rs?.absolutePosition}</td>
                                    <td>{rs?.sequence}</td>
                                    <td>{"---"}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }
    return <></>

}

const thStyle = { fontWeight: "bold" }

const tbTitle = {
    fontWeight: "bold",
    borderBottom: "1px solid #72A7C7",
    textAlign: "inherit",
}