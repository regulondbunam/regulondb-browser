import React from 'react';

const TabData = ({
    data
}) => {
    //console.log("data: ",data)
    return (
        <div style={{ width: "80%", height: "100%" }}>
            <table >
                <tbody>
                    {Object.keys(data).map((key, index) => {
                        const test = key.match(/^_/)
                        if(test === null){
                            return (
                                <tr key={key}>
                                    <td style={{fontWeight: "bold"}}>{key}</td>
                                    <td>{data[key]}</td>
                                </tr>

                            )
                        }
                        return null
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}
 
export default TabData;