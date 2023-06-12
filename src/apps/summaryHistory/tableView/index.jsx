import Table from "./Table"
import { useMemo } from 'react';


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
    data.forEach((summary) => {
        let genomicObjects = {}
        if (summary?.statistics) {
            const statistics = summary.statistics
            Object.keys(statistics).map((key) => {
                return (
                    (console.log(genomicObjects,[key]))       
                )
            })

            //iterar statistics que es un object (Object.keys())
            //dentro de la iteracion
            //guardar en nombre de la key (objeto genomico) en el objeto genomicObjectos y iniciarlo como arreglo vacio

            // hacer push del total asia el arreglo de la hey
            //... continuara

        }
        //row = {attenuators: [128,3875,192],effectors: [12,123,434,65]}
    })
    //console.log(colums)

    tableData.rows.push(rows)
    tableData.colums.push(colums)
    console.log(tableData)

    return tableData
}
