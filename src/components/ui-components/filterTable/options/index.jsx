import { GlobalFilter } from "./globalFilter"

export default function Options({
    globalFilter,
    setGlobalFilter
}) {

    return (
        <div style={{ display: "flex", alignItems: "center", width: "100%", height: "100%", flexDirection: "row-reverse" }} >
            <GlobalFilter
                value={globalFilter}
                onChange={setGlobalFilter}
                placeholder="Search in all columns..."
            />
        </div>
    )
}