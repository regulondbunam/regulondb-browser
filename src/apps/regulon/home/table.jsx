import React from 'react'
import { useTable, useBlockLayout } from 'react-table'
import { FixedSizeList } from 'react-window'
import { Link } from 'react-router-dom'
import Style from "./table.module.css"


export default function TableList({ columns, data, link = "/" }) {

    const defaultColumn = React.useMemo(
        () => ({
            width: 150,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        rows,
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
                    >
                        {row.cells.map(cell => {
                            return (
                                <div {...cell.getCellProps()} style={{ width: "100%" }}>
                                    <RegulonInfo regulon={cell.value} />
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
        <div {...getTableProps()}>
            <div {...getTableBodyProps()}>
                <FixedSizeList
                    height={500}
                    itemCount={rows.length}
                    itemSize={60}
                    width={"100%"}
                >
                    {RenderRow}
                </FixedSizeList>
            </div >
        </div>
    )
}

function RegulonInfo({ regulon }) {
    //console.log(regulon);
    let genes = ""
    if(regulon.transcriptionFactor.encodedFrom){
        if(regulon.transcriptionFactor.encodedFrom.genes.length > 0){
            genes = `Encoded Genes: ${regulon.transcriptionFactor.encodedFrom.genes.map(gene=>{return gene.gene_name}).join(", ")}`
        }
    }
    return (
        <Link to={"/regulon/" + regulon._id}>
            <div className={Style.regulon_cell} >
                    <p className='p_accent' dangerouslySetInnerHTML={{ __html: `${regulon.transcriptionFactor.name}, ${regulon.transcriptionFactor.synonyms.join(", ")}, ${regulon.transcriptionFactor.products.map(p => p.name).join(", ")} ` }} />
                    <p>{`${genes}`}</p>
            </div>
        </Link>
    );
}