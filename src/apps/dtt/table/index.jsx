import DataTable from "./dataTable";
import {  useMemo } from "react";
import { Accordion } from "../../../components/ui-components";

function Table({geneticElements,height = "100px"}) {

    const jsonTable = useMemo(()=>{
      const columns = [
        {
          headerName: 'ID',
          field: '_id'
        },
        {
          headerName: 'Name',
          field: 'labelName'
        },
        {
          headerName: 'Left Position',
          field: 'leftEndPosition'
        },
        {
          headerName: 'Right Position',
          field: 'rightEndPosition'
        },
        {
          headerName: 'Object Type',
          field: 'objectType'
        },
        {
          headerName: 'Strand',
          field: 'strand'
        },
        {
          headerName: 'color',
          field: 'objectRGBColor'
        }
      ]
      let jsonData = {
        columns: columns,
        rows: []
      }
      geneticElements.forEach(element => {
        jsonData.rows.push({
          id:element._id,
          _id:element._id,
          labelName: element.labelName,
          leftEndPosition: element.leftEndPosition,
          rightEndPosition: element.rightEndPosition,
          objectType: element.objectType,
          strand: element.strand,
          objectRGBColor: element.objectRGBColor
        })
      });
      return jsonData
    },[geneticElements])

    //console.log(jsonTable)
    return ( 
        <Accordion title={<p><b>Genetic elements annotated in RegulonDB</b></p>} >
          <DataTable columns={jsonTable.columns} rows={jsonTable.rows} />
        </Accordion>
     );
}

export default Table;