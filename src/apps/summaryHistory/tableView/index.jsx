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

    /*const tableData = useMemo(() => {
        
        return formatTable
    })*/


    formatTable(arraySummary)


    return (
        <div>
            <>Hola soy tableView</>
            <Table />
        </div>
    )
}


function formatTable(data = []) {

    let tableData = { rows: [], colums: [] }

    let colums = data.map((row) => {
        return `${row.regulonDBVersion} ${row.releaseDate}`
    })
    //console.log(rows)

    let rows = []
    let genomicObjects = {}
    let products = {}
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
    /**
     *row = [
        ["attenuators",2,12,4,45,64,3,23,4235,234,243123,14,1243,354 ...],
        ["effectors",2,12,4,45,64,3,23,4235,234,243123,14,1243,354 ...],
     ]
     1 -> Iterar Objeto (Object.keys(genomicObjects))
        1.2-> dentro de iteracion crear el arreglo [key, ...arrglo] utilizando destructuracion https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
        1.3 -> condicion si key es product crear el formato para  polipeptides, srna, rnas
        1.3 -> aniadir al arreglo row con un push()
     */
    console.log(genomicObjects)

    tableData.rows.push(rows)
    tableData.colums.push(colums)
    console.log(tableData)

    return tableData
}


