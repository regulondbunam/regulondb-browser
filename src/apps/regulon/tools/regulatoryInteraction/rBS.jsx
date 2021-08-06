import React from 'react'
import { RBSbyStite } from "./rbs/rBS_byStite";

export const RBS = ({ rbs }) => {
    return(
        <table style={{marginLeft: "5%"}} >
            <thead>
                <tr className=".tableContent-th-subtitle">
                    <th>Binding Site</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><RBSbyStite rbs={rbs}/></td>
                </tr>
            </tbody>
        </table>
    )
}
