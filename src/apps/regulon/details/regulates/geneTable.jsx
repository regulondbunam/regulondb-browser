import React from 'react'
import { Link } from 'react-router-dom'
import { useTable, useBlockLayout } from 'react-table'
import { FixedSizeList } from 'react-window'

const scrollbarWidth = () => {
    // thanks too https://davidwalsh.name/detect-scrollbar-width
    const scrollDiv = document.createElement('div')
    scrollDiv.setAttribute('style', 'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;')
    document.body.appendChild(scrollDiv)
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    document.body.removeChild(scrollDiv)
    return scrollbarWidth
}


export function Table({ columns, data }) {

    const defaultColumn = React.useMemo(
        () => ({
            width: 150,
        }),
        []
    )
    const scrollBarSize = React.useMemo(() => scrollbarWidth(), [])

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
            defaultColumn,
        },
        useBlockLayout,
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
                        console.log(cell)
                        let component = <div></div>
                        switch (cell.column.id) {
                            case "gene":
                                component = <div>
                                    <Link to={"/gene/" + cell.value.id}>
                                        <p>{`${cell.value.name} (${cell.value.function})`}</p>
                                    </Link>
                                </div>
                                break;
                            case "multifunction":
                                component = <div style={{ overflow: "auto", height: 75 }} >
                                    {cell.value.map((multi) => {
                                        return <div key={"multi_" + multi.id} ><p>{multi.name}</p></div>
                                    })}
                                </div>
                                break
                            case 'biologicalProcess':
                                component = <div style={{ overflow: "auto", height: 75 }} >
                                    {cell.value.map((bp) => {
                                        return <div key={"bp_" + bp.term_id} ><p style={{fontSize: "10px"}} >{bp.name}</p></div>
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
                </tr>
            )
        },
        [rows, prepareRow]
    )

    return (
        <>
            <table {...getTableProps()}>
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
                        height={200}
                        itemCount={rows.length}
                        itemSize={80}
                        width={totalColumnsWidth + scrollBarSize}
                    >
                        {RenderRow}
                    </FixedSizeList>
                </tbody>
            </table>
            <br />
        </>
    )
}