import React from 'react'
import { useTable, useBlockLayout } from 'react-table'
import { VariableSizeList as List} from 'react-window'
import RiItem, {riItemSize} from './item';

const scrollbarWidth = () => {
    // thanks too https://davidwalsh.name/detect-scrollbar-width
    const scrollDiv = document.createElement('div')
    scrollDiv.setAttribute('style', 'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;')
    document.body.appendChild(scrollDiv)
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    document.body.removeChild(scrollDiv)
    return scrollbarWidth
}

export default function TableList({ columns, data, allCitations }) {
    // Use the state and functions returned from useTable to build your UI

    const scrollBarSize = React.useMemo(() => scrollbarWidth(), [])
    
    let tableHeight = 200
    if(data.length > 2 ){
        tableHeight = 400
    }

    const {
        getTableProps,
        getTableBodyProps,
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

    const getItemSize = index => riItemSize(rows[index].values._data);

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
                            return (
                                <div {...cell.getCellProps()} className="td" style={{ width: "100%" }}>
                                    <RiItem regulatoryInteraction={cell.value} allCitations={allCitations} />
                                </div>
                            )
                        })}
                    </div>
                </React.Fragment>

            )
        },
        [prepareRow, rows, allCitations]
    )

    // Render the UI for your table
    //console.log(rows);
    return (
        <div style={{ width: "100%" }} {...getTableProps()}>
            <div {...getTableBodyProps()}>
                <List
                    height={tableHeight}
                    itemCount={rows.length}
                    itemSize={getItemSize}
                    width={totalColumnsWidth + scrollBarSize}
                >
                    {RenderRow}
                </List>
            </div >
        </div>
    )
}