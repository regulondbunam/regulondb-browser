import React from 'react'
import { useTable, useBlockLayout } from 'react-table'
import { FixedSizeList } from 'react-window'
import { Link } from 'react-router-dom'
import Style from "./table.module.css"
import { LinealSequence } from "../../../../components/sequence";

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
                    itemSize={220}
                    width={totalColumnsWidth + scrollBarSize}
                >
                    {RenderRow}
                </FixedSizeList>
            </div >
        </div>
    )
}

function PromoterInfo({ promoter }) {

    let distanceFrom = null
    let firstGene
    promoter.transcribedGenes.forEach(gene => {
        if (distanceFrom === null) {
            distanceFrom = gene.distanceFromTSS
            firstGene = gene
        } else {
            if (distanceFrom > gene.distanceFromTSS) {
                distanceFrom = gene.distanceFromTSS
                firstGene = gene
            }
        }
    });
    // feature {id,label,sequencePosition,type}
    let promoterFeatures = []
    //create promoter feature
    if(promoter?.sequence){
        promoter.sequence.split("").forEach((x,index)=>{
            if (x === x.toUpperCase()) {
                //let anchorId = `sequence_${promoter._id}_item_${x}_${index}`
                promoterFeatures.push({
                    id: promoter._id+"_promoter",
                    label: "+1",
                    sequencePosition: index,
                    type: "promoter"
                })
               }
        })
        if(promoter.boxes.length > 0){
            /*
            promoter.boxes.forEach((x,index)=>{

            })*/
            promoter.sequence.split("").forEach((x,index)=>{
                if (x === x.toUpperCase()) {
                    //let anchorId = `sequence_${promoter._id}_item_${x}_${index}`
                    promoterFeatures.push({
                        id: promoter._id+"_promoter",
                        label: "+1",
                        sequencePosition: index,
                        type: "promoter"
                    })
                   }
            })
        }
    }
    


    console.log(promoter);
    return (
        <div className={Style.tpRow_summary}>
            <div className={Style.tpRowTitle}>
                <p className='p_accent'>Promoter: {promoter.name}</p>
                <p> Distance from TSS {distanceFrom} to gene <Link to={"/gene/" + firstGene._id} >{firstGene.name}</Link></p>
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
                                                    <div className={Style.cell_content} >
                                                        <div>
                                                            <p style={{ fontSize: "8px" }} >{gene._id}</p>
                                                        </div>
                                                        <div>
                                                            <p style={{ fontSize: "16px", color: "black" }} dangerouslySetInnerHTML={{ __html: gene.name }} />
                                                        </div>
                                                    </div>
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
                    {promoter?.sequence && (
                        <LinealSequence sequence={promoter.sequence} color={true} height={170} sequenceId={promoter._id} features={promoterFeatures} />
                    )}
                </div>

            </div>
        </div>
    )
}