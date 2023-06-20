export default function Table({ tableData }) {
    const { colums, rows } = tableData
    
    return (
        <table>
            <thead>
                {
                    colums.map((column,i) => (
                        <tr key={i}>
                            {column.map((cell, i) => (
                                <th  key={i}>
                                    {cell}
                                </th>
                            ))}
                        </tr>
                    ))
                }
                
            </thead>
            <tbody>
                {
                    rows.map((row,i) => (
                        <tr key={i}>
                            {row.map((cell, i) => (
                                <td key={i}>
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}