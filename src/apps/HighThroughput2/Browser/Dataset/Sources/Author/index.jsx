import React, { useEffect, useMemo, useState } from "react";
import { DataVerifier } from "../../../../../../components/ui-components";
import FilterTable from "../../../Table/filterTable";

async function processAuthorsDataCSV(authorData) {
    let columns = []
    let data = []
    //process columns
    try {
        const firstRow = authorData.split("\n")[0]
        const columnsNames = firstRow.split(",")
        columnsNames.forEach((name,index) => {
            if (DataVerifier.isValidString(name)) {
                columns.push({label:name.trim()})
            }else{
                columns.push({label:"_"+index})
            }
        });
    } catch (error) {
        console.warn("error in process columns Author Data", error);
    }
    //process rowsData
    try {
        let rows = authorData.split("\n")
        rows.shift()
        rows.forEach((row) => {
            const newData = {}
            const cells = row.split(",")
            cells.forEach((cell,index) => {
                if (columns[index]?.label) {
                    newData[columns[index].label] = cell
                }
            });
            data.push(newData)
        });
    } catch (error) {
        console.error("error in process rows content Author Data", error);
    }
    

    return {columns, data}
}

export default function Author({ data }) {
  
  const [table, setTable] = useState();

  useEffect(() => {
    processAuthorsDataCSV(data?.authorsData).then((table)=>{setTable(table)})
  }, [data])
  if (table) {
    return <FilterTable {...table} tableName="Author data" />;
  }
  return <div>loading...</div>;
}
