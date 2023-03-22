import React from 'react'
import { Link } from 'react-router-dom'
import { useTable, useBlockLayout } from 'react-table'
import { FixedSizeList } from 'react-window'
import Style from "./table.module.css"

const scrollbarWidth = () => {
    // thanks too https://davidwalsh.name/detect-scrollbar-width
    const scrollDiv = document.createElement('div')
    scrollDiv.setAttribute('style', 'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;')
    document.body.appendChild(scrollDiv)
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    document.body.removeChild(scrollDiv)
    return scrollbarWidth
}



export default function Table({ columns, data }) {

    const scrollBarSize = React.useMemo(() => scrollbarWidth(), [])
    const rowHeight = 35
    let tableHeight = 400
    if(data.length < 7 ){
        tableHeight = rowHeight*data.length
    }


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        totalColumnsWidth,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useBlockLayout
    )

    const RenderRow = React.useCallback(
        ({ index, style }) => {
            const row = rows[index]
            prepareRow(row)
            return (
                <tr
                    {...row.getRowProps({
                        style,
                    })}
                >
                    {row.cells.map(cell => {
                        let component = <div></div>
                        
                        switch (cell.column.id) {
                            case "tf":
                                //console.log(cell.value);
                                component = <div>
                                    <Link to={"/tu/" + cell.value.id}>
                                        <p>{cell.value.name}</p>
                                    </Link>
                                </div>
                                break;
                            case "tfFunction":
                                component = <div>
                                    <p>{cell.value}</p>
                                </div>
                                break;
                            default:
                                break;
                        }
                        return (
                            <td {...cell.getCellProps()}>
                                {component}
                            </td>
                        )
                    })}
                </tr>
            )
        },
        [prepareRow, rows]
    )

    // Render the UI for your table
    return (
        <table {...getTableProps()} className={Style.table} >
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr{...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>

            <tbody {...getTableBodyProps()}>
                <FixedSizeList
                    height={tableHeight}
                    itemCount={rows.length}
                    itemSize={rowHeight}
                    width={totalColumnsWidth + scrollBarSize}
                >
                    {RenderRow}
                </FixedSizeList>
            </tbody>
        </table>
    )
}