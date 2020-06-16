import {Datatable} from "@o2xp/react-datatable";
import React from "react";

const options  = {
    keyColumn: 'id',
    data: {
        columns: [ 
            {
                id: "id",
                label: "id",
                colSize: "80px"
            },
            {
                id: "name",
                label: "name",
                colSize: "150px"
            },
            {
                id: "age",
                label: "age",
                colSize: "50px"
            },
        ],
        rows: [
            {
                id: "50cf",
                age: 28,
                name: "Kerr Mayo"
            },
            {
                id: "209",
                age: 34,
                name: "Freda Bowman"
            },
            {
                id: "2dd81ef",
                age: 14,
                name: "Becky Lawrence"
            }
        ],
    }
}

const Table = ({
    idTable,
    data,
    columns,
    rows
}) => {
    return ( <Datatable options={options} /> );
}
 
export default Table;