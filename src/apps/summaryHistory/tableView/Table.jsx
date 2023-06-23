import Style from "./table.module.css";

export default function Table({ tableData }) {
    const { colums, rows } = tableData
    
    return (
        <table className={Style.shTable}>
            <thead className={Style.thead}>
                {
                    colums.map((column,i) => (
                        <tr key={i}>
                            {column.map((cell, i) => (
                                <th  key={i} className={Style.th}>
                                    {cell}
                                </th>
                            ))}
                        </tr>
                    ))
                }
                
            </thead>
            <tbody className={Style.body}>
                {
                    rows.map((row,i) => (
                        <tr key={i}>
                            {row.map((cell, i) => (
                                <td key={i} className={Style.td} >
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