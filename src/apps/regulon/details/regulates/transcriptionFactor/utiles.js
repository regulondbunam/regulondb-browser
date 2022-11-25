export function formatJsonTable(panel, elements, type = "grid") {
    let panelWidth = panel.clientWidth
    let columns = []
    let data = []
    let cellWidth
    let numberColumns
    switch (type) {
        case "list":
            numberColumns = 1
            cellWidth = 300
            break;
        default:
        case "grid":
            cellWidth = 250
            numberColumns = panelWidth / (cellWidth + 5)
            break;
    }
    for (let i = 0; i < numberColumns; i++) {
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
                    row[`column_${i}`] = gn
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
    //console.log(numberColumns);
    return { columns: columns, data: data, total:elements.length }
}