import React from 'react'
import Style from "./table.module.css"
import { useTable, useBlockLayout } from 'react-table'
import { FixedSizeList } from 'react-window'
import { Link } from 'react-router-dom'

const scrollbarWidth = () => {
    // thanks too https://davidwalsh.name/detect-scrollbar-width
    const scrollDiv = document.createElement('div')
    scrollDiv.setAttribute('style', 'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;')
    document.body.appendChild(scrollDiv)
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    document.body.removeChild(scrollDiv)
    return scrollbarWidth
}
/*
const Styles = styled.div`
  padding: 1rem;

  .table {
    display: inline-block;
    border-spacing: 5;
    

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 1px solid black;
      }
    }
  }
`*/

export default function Table({ columns, data, link = "/", type = "grid" }) {
    // Use the state and functions returned from useTable to build your UI

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
        rows,
        totalColumnsWidth,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
        },
        useBlockLayout
    )

    const RenderRow = React.useCallback(
        ({ index, style }) => {
            const row = rows[index]
            prepareRow(row)
            return (
                <div
                    {...row.getRowProps({
                        style,
                    })}
                    className="tr"
                >
                    {row.cells.map(cell => {
                        //console.log(cell.value)
                        let styleCell
                        switch (type) {
                            case "list":
                                styleCell =  Style.cell_list
                                break;
                            default:
                            case "grid":
                                styleCell = Style.cell_content
                        }
                        return (
                            <div {...cell.getCellProps()} className="td">
                                {cell.value?.id && (
                                    <Link to={link + "/" + cell.value.id} >
                                        <div className={styleCell} >
                                            <div className={Style.cell_id} >
                                                <div>
                                                <p style={{ fontSize: "8px" }} >{cell.value.id}</p>
                                                </div>
                                                <div>
                                                <p  style={{ fontSize: "16px" }} dangerouslySetInnerHTML={{__html: cell.value.name}} />
                                            </div>
                                            </div>
                                            
                                            <div>
                                            <p  style={{ fontSize: "14px" }} dangerouslySetInnerHTML={{__html: cell.value.function}} />
                                            </div>
                                        </div>
                                    </Link>
                                )}
                                    <div>
                                        <div>
                                            <p style={{ fontSize: "8px" }} ></p>
                                        </div>
                                        <div>
                                            <p></p>
                                        </div>
                                    </div>
                            </div>
                        )
                    })}
                </div>
            )
        },
        [prepareRow, rows, link, type]
    )

    // Render the UI for your table
    return (
        <div {...getTableProps()}>
            <div>

            </div>
            <div className={Style.table_content} {...getTableBodyProps()}>
                <FixedSizeList
                    height={200}
                    itemCount={rows.length}
                    itemSize={50}
                    width={totalColumnsWidth + scrollBarSize}
                >
                    {RenderRow}
                </FixedSizeList>
            </div>
        </div>
    )
}