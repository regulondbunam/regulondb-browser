import React from 'react'
import { useTable, useBlockLayout } from 'react-table'
import { FixedSizeList } from 'react-window'
import { Link } from 'react-router-dom'
import { LinealSequence } from "../../../../components/sequence";
import { ParagraphCitations } from "../../../../components/citations/index"

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
                                    <RegulatoryInteraction regulatoryInteraction={cell.value} allCitations={allCitations} />
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
    return (
        <div style={{ width: "100%" }} {...getTableProps()}>
            <div {...getTableBodyProps()}>
                <FixedSizeList
                    height={1200}
                    itemCount={rows.length}
                    itemSize={290}
                    width={totalColumnsWidth + scrollBarSize}
                >
                    {RenderRow}
                </FixedSizeList>
            </div >
        </div>
    )
}

function RegulatoryInteraction({ regulatoryInteraction, allCitations }) {

    return (
        <table className='table_data' style={{ width: '100%' }} >
            <thead>
                <tr>
                    {regulatoryInteraction.regulator?.name && regulatoryInteraction.regulatedEntity?.name
                        ? (
                            <th>
                                <p className='p_accent' >{`Interaction ${regulatoryInteraction.regulator.name} - ${regulatoryInteraction.regulatedEntity
                                    .name}`}</p>
                                <p>{`${regulatoryInteraction.regulator.type} - ${regulatoryInteraction.regulatedEntity.type}`}</p>
                            </th>
                        )
                        : (null)}
                    {regulatoryInteraction.regulator?.name && !regulatoryInteraction.regulatedEntity?.name
                        ? (
                            <th>
                                <p className='p_accent' >{`Interaction  ${regulatoryInteraction.regulator.name}`}</p>
                                <p>{`${regulatoryInteraction.regulator.type}`}</p>
                            </th>
                        )
                        : (null)}
                    {!regulatoryInteraction.regulator?.name && regulatoryInteraction.regulatedEntity?.name
                        ? (
                            <th>
                                <p className='p_accent' >{`Interaction ${regulatoryInteraction.regulatedEntity?.name}`}</p>
                                <p>{`${regulatoryInteraction.regulatedEntity.type}`}</p>
                            </th>
                        )
                        : (null)}
                </tr>
            </thead>
            <tbody>
                {regulatoryInteraction?.function && (
                    <tr><td><p>{`Function: ${regulatoryInteraction?.function}`}</p></td></tr>
                )}
                {regulatoryInteraction?.distanceToFirstGene && (
                    <tr><td><p>{`Distance to first gene: ${regulatoryInteraction?.distanceToFirstGene}`}</p></td></tr>
                )}
                {regulatoryInteraction?.distanceToPromoter && (
                    <tr><td><p>{`Distance to promoter: ${regulatoryInteraction?.distanceToPromoter}`}</p></td></tr>
                )}
                {regulatoryInteraction.regulatedGenes.length && (
                    <tr><td>
                        <div>
                            <div>Regulated Genes: </div>
                            <div>
                                {regulatoryInteraction.regulatedGenes.map((gene, index) => {
                                    return (
                                        <Link key={"reg_" + gene.id + "_i" + index} style={{ float: "left", marginLeft: "5px" }} to={"/gene/" + gene.id}> <p>{gene.name}</p> </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </td></tr>
                )}
                {regulatoryInteraction.regulatoryBindingSites?.id && (
                    <tr><td>
                        <div>
                            <div>Regulatory Binding Site</div>
                            <RBS regulatoryBindingSites={regulatoryInteraction.regulatoryBindingSites} allCitations={allCitations} />
                        </div>
                    </td></tr>
                )}
                {regulatoryInteraction.citations.length > 0 && (
                    <tr><td>
                        <div>
                            <div>Citations: </div>
                            <div style={{ marginLeft: "10px" }} >
                                {ParagraphCitations({
                                    allCitations: allCitations,
                                    citations: regulatoryInteraction.citations
                                })}
                            </div>
                        </div>
                    </td></tr>
                )}
            </tbody>
        </table>
    )
}

function RBS({ regulatoryBindingSites, allCitations }) {
    //console.log(regulatoryBindingSites);
    const {
        absolutePosition,
        citations,
        id,
        leftEndPosition,
        rightEndPosition,
        sequence,
        strand
    } = regulatoryBindingSites

    return (
        <div style={{ marginLeft: "10px" }} >
            <LinealSequence sequence={sequence} color={true} height={30} sequenceId={"ris_" + id} />
            <div>
                {absolutePosition && (`Absolute Position: ${absolutePosition}`)}
                {leftEndPosition && (
                    <div>
                        <p>{`Position: ${leftEndPosition} ${strand === "reverse" ? ("<--") : ("-->")} ${rightEndPosition} (${strand})`}</p>
                    </div>
                )}
                {citations.length > 0 && (
                    <div>
                        Citations: {ParagraphCitations({
                            allCitations: allCitations,
                            citations: citations
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

/**
 *  <div className={Style.tpRow_sequence}>
                    {promoter?.sequence && (
                        
                    )}
                </div>
 */