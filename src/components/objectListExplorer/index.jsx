import Paper from '@mui/material/Paper';
import { useMemo, useState } from "react";
import { formatJsonTable } from "./formatData";
import Style from "./style.module.css"
import SelectFilter from "./selectFilter";
import Divider from '@mui/material/Divider';
import TableList from "./tableList";

export default function ObjectListExplorer({ attributesEnabled, objectsList }) {
  const objectsData = useMemo(() => {
    return formatJsonTable(objectsList)
  }, [objectsList])
  const [FilterData, setFilterData] = useState(objectsData);
  return (
    <Paper elevation={1} >
      <div className={Style.mainDiv}>
        <SelectFilter ObjectsData={objectsData} setFilterData={setFilterData} attributesEnabled={attributesEnabled} />
        <br />
        <Divider />
        {FilterData?.data && (
          <TableList data={FilterData.data} columns={FilterData.columns} />
        )}
      </div>
    </Paper>
  )
}
