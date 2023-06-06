import Table from "./Table"
import {useMemo} from 'react';

export default function TableView({arraySummary = []}) {

    const tableData = useMemo(()=>{
        return formatTable
    })

    return (
        <div>
            <>Hola soy tableView</>
            <Table/>
        </div>
    )
}

function formatTable(){
    let tableData = {rows: [], colums: []}
    //logica
    return tableData
}