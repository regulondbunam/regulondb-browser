import React from 'react'
import { MarkSequenceWithPositions } from "./mkSequence";
//import { IconButton } from '../../../../../components/ui-components/ui_components'

// eslint-disable-next-line no-unused-vars
const styleIconButton = {
    width: "20px",
    height: "20px",
    float: "left"
}

const thStyle = {
    fontWeight: "bold",
    borderBottom: "1px solid #72A7C7",
    textAlign: "inherit",
}
// eslint-disable-next-line no-unused-vars
const tbTitle = {
    fontWeight: "bold",
    borderBottom: "1px solid #72A7C7",
    textAlign: "inherit",
    fontSize: "10px",
}

export function RowInfo(formatData) {
    console.log(formatData)
    //const _viewInfo = true
    /*
    const [_viewInfo, set_viewInfo] = useState(true)

    let viewInfo = "expand_less"
        if (!_viewInfo) {
            viewInfo = "expand_more"
        }
    */
    try {
        if (formatData.length > 0) {
            return (
                <div>
                    {
                        formatData.map(data => {
                            return (
                                <table key={`tabe_site_${data?.idSite}`}>
                                    <thead>
                                        <tr>
                                            <th style={thStyle} colSpan="2">
                                                Site: {data?.idSite}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr >
                                            <td colSpan="2" >{data?.info}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2" >Function: {data?.function}</td>
                                        </tr>
                                        <tr >
                                            <td colSpan="2" ><MarkSequenceWithPositions sequenceInfo={data?.sequenceInfo} /></td>
                                        </tr>
                                        <tr >
                                            <td>Center Position: {data?.center}</td>
                                            <td>Absolute Position: {data?.absolute}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            )
                        })
                    }
                </div>
            )
        }
    } catch (error) {
        console.error("error despliegue de sitios: ", error)
        return <>error</>
        
    }
    return <>hola</>
}