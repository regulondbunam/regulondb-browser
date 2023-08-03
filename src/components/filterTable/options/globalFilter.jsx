import React from "react"
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Button, Tooltip } from "@mui/material";

export function GlobalFilter({
    value: initialValue,
    onChange,
    debounce = 500,
    placeholder,
    ...props
}) {
    const [value, setValue] = React.useState(initialValue)
    const [view, setView] = React.useState(false)

    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value, onChange, debounce])

    return (
        <div style={{ display: "flex", alignItems: "center" }} >
            <Button 
            onClick={()=>{setView(!view)}}
            color="secondary"
            sx={{ height: "25px", minWidth: "25px" }} variant={view ? "outlined" : "contained"} >
                <Tooltip title={view ?  "clean search" : placeholder } >
                    {view ? <SearchOffIcon /> : <SearchIcon />}
                </Tooltip>
            </Button>
            {view && (
                <div>
                    <input placeholder={placeholder} style={{ height: "25px" }} {...props} value={value} onChange={e => setValue(e.target.value)} />
                </div>
            )}
        </div>
    )
}