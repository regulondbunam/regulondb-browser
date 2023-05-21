import { useTable, useBlockLayout, useGlobalFilter, useResizeColumns, useSortBy, useFilters } from 'react-table'
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import SortIcon from '@mui/icons-material/Sort';
import { FixedSizeList } from 'react-window'

import React from 'react';
import GlobalFilter from './components/GlobalFilter'
//import { ColumnSelector } from './components/ColumnSelector'
import filterRows from './components/filterRows';
import { OptionFilter } from './components/filters';

import scrollbarWidth from './scrollbarWidth'
import Style from './table.module.css'

export function validString(value) {
    if (typeof value === 'string' || value instanceof String) {
        return value
    }
    return ""
}

export function isValidString(value) {
    return typeof value === 'string' || value instanceof String
}

export function isValidArray(value = []) {
    if (Array.isArray(value)) {
        if (value.length > 0) {
            return true;
        }
    }
    return false;
}


export default function FilterTable({ columns, data }) {

    //const [downloadAction, setDownloadAction] = React.useState();
    const _nRows = 20
    const defaultColumn = React.useMemo(
        () => ({
            width: 150,
            Filter: OptionFilter,
        }),
        []
    )
    const filterTypes = React.useMemo(
        () => ({
            fuzzyText: filterRows,
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
        state,
        preGlobalFilteredRows,
        prepareRow,
        setGlobalFilter,
        allColumns,
        getToggleHideAllColumnsProps,
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            filterTypes,
        },
        useFilters, // useFilters!
        useGlobalFilter, // useGlobalFilter!
        useBlockLayout,
        useGlobalFilter,
        useSortBy,
        useResizeColumns
    )

    // use row to download filtered data 
    //console.log(preGlobalFilteredRows)

    const itemSize = 30
    const heightTable = _nRows * itemSize
    const itemScroll = heightTable / rows.length
    const itemsView = heightTable / itemSize
    let thumbHeight = itemsView * itemScroll
    if (thumbHeight > heightTable) thumbHeight = 0
    let listRef = React.createRef();

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
                        return (
                            <td {...cell.getCellProps()}>
                                {cell.render('Cell')}
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
        <div>
            <div>
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                    allColumns={allColumns}
                />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "auto 10px" }}  >
                <table className={Style.mainTable} >
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column, index) => (
                                    <th className={Style.th} key={`table_main_${index}`} {...column.getHeaderProps()} >
                                        {isValidString(column.render('Header')) && (
                                            <div>
                                                <div className={Style.thLabel}  >
                                                    <div
                                                        className={Style.resizerRight}
                                                    />
                                                    <div {...column.getHeaderProps(column.getSortByToggleProps())} >
                                                        {column.render('Header')}
                                                        <span>
                                                            {column.isSorted
                                                                ? column.isSortedDesc
                                                                    ? '(Z-A)'
                                                                    : '(A-Z)'
                                                                : ''}
                                                        </span>
                                                    </div>
                                                    <div
                                                        {...column.getResizerProps()}
                                                        className={`${Style.resizer} ${column.isResizing ? Style.isResizing : ''}`}
                                                    />
                                                </div>
                                                <div>
                                                    {column.canFilter ? column.render('Filter') : null}
                                                </div>
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody  {...getTableBodyProps()} >
                            <FixedSizeList
                                height={heightTable}
                                itemCount={rows.length}
                                itemSize={itemSize}
                                width={totalColumnsWidth + scrollBarSize}
                                className={Style.bodyTableAuthor}
                                ref={listRef}
                                onItemsRendered={({
                                    visibleStartIndex,
                                }) => {
                                    let thumb = document.getElementById("scrollThumb")
                                    if (thumb) {
                                        if ((itemScroll * visibleStartIndex) > heightTable) {
                                            thumb.style.top = `${heightTable}px`
                                        } else {
                                            thumb.style.top = `${itemScroll * visibleStartIndex}px`
                                        }

                                    }
                                }}
                            >
                                {RenderRow}
                            </FixedSizeList>
                        </tbody>
                </table>
                <div className={Style.scrollIndicator} id="scrollIndicator_author"
                    style={{ height: `${heightTable}px` }}
                    onClick={e => {
                        let ind = e.target
                        ind = ind.getBoundingClientRect()
                        let sel = (e.clientY - ind.top) * (rows.length / heightTable)
                        console.log(sel);
                        listRef.current.scrollToItem(sel)
                    }} >
                    <div className={Style.scrollThumb} id='scrollThumb' style={{ height: `${thumbHeight}px` }} ></div>
                </div>
            </div>

        </div>

    )
}

/*
            <div className={Style.author_row}  >
                <ColumnSelector columnsInfo={metadata.columns} getToggleHideAllColumnsProps={getToggleHideAllColumnsProps} allColumns={allColumns} />
            </div>

            <TableStyles className={Style.window_table}>
                    <div {...getTableProps()} className="table">
                        <div >
                            {headerGroups.map(headerGroup => (
                                <div {...headerGroup.getHeaderGroupProps()} className="tr">
                                    {headerGroup.headers.map((column, index) => (
                                        <div key={`table_main_${index}`} >
                                            <div {...column.getHeaderProps(column.getSortByToggleProps())} className="th" >
                                                {column.render('Header')}
                                                <span>
                                                    {column.isSorted
                                                        ? column.isSortedDesc
                                                            ? '(Z-A)'
                                                            : '(A-Z)'
                                                        : ''}
                                                </span>
                                                <div
                                                    {...column.getResizerProps()}
                                                    className={`resizer ${column.isResizing ? 'isResizing' : ''
                                                        }`}
                                                />
                                            </div>
                                            <div style={{ display: "flex" }} >
                                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                                            </div>

                                        </div>

                                    ))}
                                </div>
                            ))}
                        </div>

                        <div  {...getTableBodyProps()} >
                            <FixedSizeList
                                height={heightTable}
                                itemCount={rows.length}
                                itemSize={itemSize}
                                width={totalColumnsWidth + scrollBarSize}
                                className={Style.bodyTableAuthor}
                                ref={listRef}
                                onItemsRendered={({
                                    visibleStartIndex,
                                }) => {
                                    let thumb = document.getElementById("scrollThumb")
                                    if (thumb) {
                                        if ((itemScroll * visibleStartIndex) > heightTable) {
                                            thumb.style.top = `${heightTable}px`
                                        } else {
                                            thumb.style.top = `${itemScroll * visibleStartIndex}px`
                                        }

                                    }
                                }}
                            >
                                {RenderRow}
                            </FixedSizeList>
                        </div>
                    </div>
                </TableStyles>
                <div className={Style.scrollIndicator} id="scrollIndicator_author"
                    style={{ height: `${heightTable}px` }}
                    onClick={e => {
                        let ind = e.target
                        ind = ind.getBoundingClientRect()
                        let sel = (e.clientY - ind.top) * (rows.length / heightTable)
                        console.log(sel);
                        listRef.current.scrollToItem(sel)
                    }} >
                    <div className={Style.scrollThumb} id='scrollThumb' style={{ height: `${thumbHeight}px` }} ></div>
                </div>
*/