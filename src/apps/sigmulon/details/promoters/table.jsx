import React, { useState } from 'react'
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

export default function TableList({ columns, data, link = "/" }) {
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
                            return (
                                <div {...cell.getCellProps()} className="td" style={{ width: "100%" }}>
                                    <PromoterInfo promoter={cell.value} />
                                </div>
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
        <div style={{ width: "100%" }} {...getTableProps()}>
            <div {...getTableBodyProps()}>
                <FixedSizeList
                    height={1200}
                    itemCount={rows.length}
                    itemSize={200}
                    width={totalColumnsWidth + scrollBarSize}
                >
                    {RenderRow}
                </FixedSizeList>
            </div >
        </div>
    )
}

function PromoterInfo({ promoter }) {

    const [_showCitations, set_showCitations] = useState(false);

    console.log(promoter);
    return (
        <div className={Style.tpRow_summary}>
            <div className={Style.tpRowTitle}>
                <p className='p_accent'>Promoter: {promoter.name}</p>
            </div>
            <div className={Style.tpRow_content}>
                <div className={Style.tpRow_genes}>
                    <table className={Style.tpRow_genes_table} >
                        <thead>
                            <tr>
                                <th>Transcribed Genes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                promoter.transcribedGenes.map((gene, inx) => {
                                    return (
                                        <tr key={"genePromoter_" + gene._id + "_" + inx}>
                                            <td>
                                                <Link to={"/gene/" + gene._id} >
                                                    <table className={Style.tpRow_gene_table} >
                                                        <tbody>
                                                            <tr><td style={{fontSize: "12px"}} >{gene.name}</td></tr>
                                                            <tr><td>Distance from TSS</td></tr>
                                                            <tr><td>{gene.distanceFromTSS}</td></tr>
                                                        </tbody>
                                                    </table>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className={Style.tpRow_boxes}>
                    <table className={Style.tpRow_boxes_table}>
                        <thead>
                            <tr>
                                <th>Boxes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {promoter.boxes.map((box, inx) => {
                                return (
                                    <table key={"boxElement_" + box.sequence + "_" + inx} className={Style.tpRow_box_table} >
                                        <thead>
                                            <tr><th colSpan={2} >{box.type}</th></tr>
                                            <tr><th colSpan={2} >{box.sequence}</th></tr>
                                        </thead>
                                        <tbody>
                                            <tr><td colSpan={2}>Position</td></tr>
                                            <tr>
                                                <td>{box.leftEndPosition}</td>
                                                <td>{box.rightEndPosition}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className={Style.tpRow_sequence}>
                    {promoter.sequence}
                </div>

            </div>
        </div>
    )
}