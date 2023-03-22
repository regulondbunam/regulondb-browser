import React from 'react'
import { useTable, useBlockLayout } from 'react-table'
import { FixedSizeList } from 'react-window'
import { Link } from 'react-router-dom'
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

export default function TableList({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI

    const scrollBarSize = React.useMemo(() => scrollbarWidth(), [])
    const rowHeight = 60
    let tableHeight = 500
    if(data.length < 6 ){
        tableHeight = rowHeight*data.length
    }

    const {
        getTableProps,
        getTableBodyProps,
        rows,
        headerGroups,
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
                <React.Fragment>
                    <div
                        {...row.getRowProps({
                            style,
                        })}
                    >
                        {row.cells.map(cell => {
                            let component = <div>...</div>
                            switch (cell.column.id) {
                                case "name":
                                    component = cell.value
                                    break;
                                case "genes":
                                    component = <div style={{height: "50px", overflow: "auto"}}>
                                        {cell.value.map((gene) => {
                                            return <div key={"gene_" + gene._id} style={{float: "left", marginLeft: "10px"}} ><Link to={"/gene/"+gene._id}>{gene.name}</Link></div>
                                        })}
                                    </div>
                                    break
                                default:
                                    break;
                            }
                            return (
                                <td {...cell.getCellProps()}>
                                    {component}
                                </td>
                            )
                        })}
                    </div>
                </React.Fragment>

            )
        },
        [prepareRow, rows]
    )

    // Render the UI for your table
    return (
        <table {...getTableProps()} className={Style.geneTable} >
        <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
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
/**
 *  <div className={Style.tpRow_sequence}>
                    {promoter?.sequence && (
                        
                    )}
                </div>
 */