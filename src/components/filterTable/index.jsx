import { useTable, useBlockLayout, useGlobalFilter, useResizeColumns, useSortBy, useFilters } from 'react-table'
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import SortIcon from '@mui/icons-material/Sort';
import { VariableSizeList as List } from 'react-window';
import { TableStyles } from "./styledComponents"
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


export default function FilterTable({ columns, data, getItemSize = ()=>{return 30 } }) {

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
                <div
                    {...row.getRowProps({
                        style,
                    })}
                    className={index % 2 ? Style.rowTable : ''}
                >
                    {row.cells.map(cell => {
                        return (
                            <div {...cell.getCellProps()} className="td">
                                {cell.render('Cell')}
                            </div>
                        )
                    })}
                </div>
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
            <div style={{ display: "grid", gridTemplateColumns: "auto 10px" }} >
                <TableStyles className={Style.window_table}>
                    <div {...getTableProps()} style={{ width: "100%" }} className="table">
                        <div >
                            {headerGroups.map(headerGroup => (
                                <div {...headerGroup.getHeaderGroupProps()} className="tr">
                                    {headerGroup.headers.map((column, index) => (
                                        <div key={`table_main_${index}`} >
                                            <div {...column.getHeaderProps()} className="th" >
                                                {isValidString(column.render('Header')) ? (
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
                                                )
                                            :(
                                                <div>{column.render('Header')}</div>
                                            )}
                                            </div>
                                        </div>

                                    ))}
                                </div>
                            ))}
                        </div>

                        <div  {...getTableBodyProps()} >
                            <List
                                height={heightTable}
                                itemCount={rows.length}
                                itemSize={getItemSize}
                                width={totalColumnsWidth + scrollBarSize}
                                className={Style.bodyTable}
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
                            </List>
                        </div>
                    </div>
                </TableStyles>
            </div>

        </div>

    )
}

/*
            <div className={Style.author_row}  >
                <ColumnSelector columnsInfo={metadata.columns} getToggleHideAllColumnsProps={getToggleHideAllColumnsProps} allColumns={allColumns} />
            </div>

            


                <div style={{overflow: "auto" }}  >
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
                                className={Style.bodyTable}
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
            </div>
*/