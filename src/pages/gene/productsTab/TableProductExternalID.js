import React from 'react';

const TableProductExternalID = ({
    externalCrossReferences
}) => {
    console.log(externalCrossReferences)
    return ( 
        <table>
            <thead>
                <tr>
                    <th>
                        External Cross References 
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    externalCrossReferences.map((item, index)=>{
                        return(
                            <tr key={`${index}_${item.id}_`}>
                                <td>
                                <a  href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
     );
}
 
export default TableProductExternalID;