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
    let genes = ""
    if(regulon.encodedGenes){
        if(regulon.encodedGenes.length > 0){
            genes = `Encoded Genes: ${regulon.encodedGenes.map(gene=>{return gene.gene_name}).join(", ")}`
        }
    }
    return (
        <Link to={"/regulon/" + regulon._id}>
            <div className={Style.regulon_cell} >
                    <p className='p_accent' dangerouslySetInnerHTML={{ __html: `${regulon.name}, ${regulon.synonyms.join(", ")}, ${regulon.productsName.join(", ")} ` }} />
                    <p>{`${genes}`}</p>
            </div>
        </Link>
    );
}