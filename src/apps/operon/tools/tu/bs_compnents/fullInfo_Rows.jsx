import React, {useState} from 'react'
import { IconButton } from '../../../../../components/ui-components/ui_components'


export function RowInfo({bs}) {
    const [_viewInfo, set_viewInfo] = useState(true)

    let viewInfo = "expand_less"
        if (!_viewInfo) {
            viewInfo = "expand_more"
        }
    return (
        <tr>
            <td colSpan="3">
                {
                    _viewInfo
                        ? <table>
                            <thead>
                                <tr>
                                    <th style={thStyle} >Function</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{fontSize: "10px"}}>{bs?.function}</td>
                                </tr>
                            </tbody>
                        </table>
                        : null
                }

            </td>
            <td>
                <IconButton icon={viewInfo} onClick={() => { set_viewInfo(!_viewInfo) }} style={styleIconButton} iconStyle={{ fontSize: "14px" }} />
            </td>
        </tr>
    )
}