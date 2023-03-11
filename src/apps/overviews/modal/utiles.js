 /**
  * component that creates columns and fills them with data
  * @param {object} panel -Panel where the modal will be displayed
  * @param {array} objectsRelated - Array od the data
  * @returns  {ReactElement} 
  */
export function formatJsonTable(panel, objectsRelated) {
    let panelWidth = panel.clientWidth
    let columns = []
    let data = []
    let cellWidth = 95
    const numberColumns = panelWidth / (cellWidth + 5)
    //crean las columnas
    for (let i = 0; i < numberColumns; i++) {
        columns.push({
            Header: '-',
            accessor: `column_${i}`,
            width: cellWidth
        })
    }
    //llenan las columnas
    if (objectsRelated.length > 0) {
        let rowObjectsRelated = []
        objectsRelated.forEach((objectRelated) => {
            if (rowObjectsRelated.length < numberColumns) {
                rowObjectsRelated.push(objectRelated)
            } else {
                let row = {}
                rowObjectsRelated.forEach((obj, i) => {
                    row[`column_${i}`] = obj
                })
                data.push(row)
                rowObjectsRelated = [objectRelated]
            }
        })
        if (rowObjectsRelated.length > 0) {
            let row = {}
            rowObjectsRelated.forEach((obj, i) => {
                row[`column_${i}`] = obj
            })
            data.push(row)
        }
    }
    console.log(data)
    return { columns: columns, data: data }
}