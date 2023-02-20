import React from 'react'
import { useTable, useBlockLayout } from 'react-table'
import { FixedSizeList } from 'react-window'
import { Link } from 'react-router-dom'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Style from "./table.module.css"


export default function TableList({ columns, data }) {

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
                <ListItem
                    sx={{ width: "100%" }}
                    {...row.getRowProps({
                        style,
                    })}
                >
                    {row.cells.map(cell => {
                        let obj = cell.value;
                        let primary = `${obj.datamartType} ${obj.name}`
                        let secondary = ""
                        if (obj.encodedGenes.length > 0) {
                            secondary += `Genes: ${obj.encodedGenes.join(", ")}, `
                        }
                        if (obj.productsName.length > 0) {
                            secondary += `Product: ${obj.productsName.join(", ")}, `
                        }
                        if (obj.sigmulonGeneName) {
                            secondary +=  `SigmulonGeneName: ${obj.sigmulonGeneName}, `
                        }
                        if (obj.synonyms.length > 0) {
                            secondary += `Synonyms: ${obj.synonyms.join(", ")}`
                        }
                        return (
                            <div {...cell.getCellProps()} style={{ width: "100%" }} className={Style.cell} >
                                <Link to={`/${obj.datamartType}/${obj._id}`}>
                                    <ListItemText primary={primary} secondary={secondary} />
                                </Link>
                                <Divider />
                            </div>
                        )
                    })}

                </ListItem>
            )
        },
        [prepareRow, rows]
    )

    // Render the UI for your table
    return (
        <div {...getTableProps()}>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }} {...getTableBodyProps()} >
                <FixedSizeList
                    height={500}
                    itemCount={rows.length}
                    itemSize={60}
                    width={"100%"}
                >
                    {RenderRow}
                </FixedSizeList>
            </List>
        </div>
    )
}
