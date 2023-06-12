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
    //logica
    let colums = data.map((row) => {
        return `${row.regulonDBVersion} ${row.releaseDate}`
    })
    //console.log(rows)

    let rows = []
    let genomicObjects = {}
    data.forEach((summary) => {

        //Creacion Filas
        if (validObject(summary.statistics)) {
            const statistics = summary.statistics
            Object.keys(statistics).map((key) => {
                const statistic = statistics[key]
                if(!genomicObjects.hasOwnProperty(key)){
                    genomicObjects[key] = []
                }
                if (validObject(statistic)) {
                    if (statistic.__typename === "detailedStatistics") {
                        genomicObjects[key].push(statistic.total)
                    }
                    //condicion si typename es dbInfoExternalReferencesType
                    //condicion si typename es  productsDBInfoType
                    //condicion si typename es dbInfoRegulons 
                }
            })


        }
        //row = {attenuators: [128,3875,192],effectors: [12,123,434,65]}
    })
    console.log(genomicObjects)

    tableData.rows.push(rows)
    tableData.colums.push(colums)
    console.log(tableData)

    return tableData
}


