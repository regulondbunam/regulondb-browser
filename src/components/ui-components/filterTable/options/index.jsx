import { GlobalFilter } from "./globalFilter"
import { Download } from "./download"

export default function Options({
    getAllFlatColumns,
    globalFilter,
    setGlobalFilter,
    data,
    fileName,
    preGlobalFilteredRows,
}) {

    return (
        <div style={{ display: "flex", alignItems: "center", width: "100%", height: "100%", flexDirection: "row-reverse" }} >
            <Download data={data} fileName={fileName} preGlobalFilteredRows={preGlobalFilteredRows} getAllFlatColumns={getAllFlatColumns} />
            <GlobalFilter
                value={globalFilter}
                onChange={setGlobalFilter}
                placeholder="Search in all columns..."
            />
            
        </div>
    )
}