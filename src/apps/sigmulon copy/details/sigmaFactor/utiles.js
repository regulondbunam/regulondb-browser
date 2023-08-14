export function formatJsonTable(panel, elements) {
    let panelWidth = panel.clientWidth
    let columns = []
    let data = []
    let cellWidth = 95
    const numberColumns = panelWidth / (cellWidth + 5)
    for (let i = 1; i < numberColumns; i++) {
        columns.push({
            Header: '-',
            accessor: `column_${i}`,
            width: cellWidth
        })
    }
    if (elements.length > 0) {
        let rowGenes = []
        elements.forEach((gene) => {
            if (rowGenes.length < numberColumns) {
                rowGenes.push(gene)
            } else {
                let row = {}
                rowGenes.forEach((gn, i) => {
                    row[`column_${i+1}`] = gn
                })
                data.push(row)
                rowGenes = [gene]
            }
        })
        if (rowGenes.length > 0) {
            let row = {}
            rowGenes.forEach((gn, i) => {
                row[`column_${i+1}`] = gn
            })
            data.push(row)
        }
    }
    return { columns: columns, data: data }
}