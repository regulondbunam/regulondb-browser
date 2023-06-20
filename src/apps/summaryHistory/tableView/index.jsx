import Table from "./Table"
import { useMemo } from 'react';

//Valida si el objeto entrante tiene un valor valido
function validObject(obj) {
    if (!obj) {
        return false
    }
    if (obj === null) {
        return false
    }
    return true
}

/**
 * Description placeholder
 * @date 6/5/2023 - 6:31:53 PM
 *
 * @export
 * @param {{ arraySummary?: {}; }} {arraySummary = []}
 * @returns {*}
 */
export default function TableView({ arraySummary = [] }) {

    const tableData = useMemo(() => {
        return formatTable(arraySummary)
    })


    return (
        <div>
            <>Hola soy tableView</>
            <Table tableData={tableData} />
        </div>
    )
}


function formatTable(data = []) {

    let tableData = { rows: [], colums: [] }

    let colums = data.map((row) => {
        if(validObject(row.statistics)){
            return `${row.regulonDBVersion} ${row.releaseDate}`
        }
       
    })
    colums = colums.filter(row=>row !== undefined)
    colums.unshift('Object')
    //console.log(rows)

    let rows = []
    let genomicObjects = {}
    data.forEach((summary) => {
        
        //Creacion Filas
        if (validObject(summary.statistics)) {
            const statistics = summary.statistics
            Object.keys(statistics).map((key) => {
                const statistic = statistics[key]
                if (!genomicObjects.hasOwnProperty(key)) {
                    genomicObjects[key] = []
                }
                if (validObject(statistic)) {
                    if (statistic.__typename === "detailedStatistics") {
                        genomicObjects[key].push(statistic.total)
                    }
                    if (statistic.__typename === "dbInfoRegulons") {
                        genomicObjects[key].push(statistic.total)
                    }
                    if (statistic.__typename === "productsDBInfoType") {
                        Object.keys(statistics.product).map((key) => {
                            //validar si el key de product esta dentro de genomicObjects
                            if (!genomicObjects.hasOwnProperty(key)) {
                                genomicObjects[key] = []
                            }
                            const product = statistics.product[key]
                            if (validObject(product)) {
                                genomicObjects[key].push(product.total)
                                //console.log(products)
                            }
                        })
                        genomicObjects[key].push(null)
                    }
                    if (statistic.__typename === "dbInfoExternalReferencesType") {
                        genomicObjects[key].push(statistic.total)
                    }
                }
            })
        }
        
    })
    
    Object.keys(genomicObjects).forEach((key) => {
        if (key !== "__typename") {
            let { object = key, array = genomicObjects[key] } = genomicObjects[key]
            rows.push([object, ...array ])
        }
    })

    tableData.rows = rows
    tableData.colums.push(colums)

    return tableData
}


