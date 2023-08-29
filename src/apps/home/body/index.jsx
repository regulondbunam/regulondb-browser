import { ReleaseCard } from "./releaseCard"
import { SummaryCard } from "./summary"
import Stack from '@mui/material/Stack';




export function Body() {
    return (
        <div style={{ padding: "1%" }} >
            <Stack direction="row" spacing={{ xs: 3, sm: 5 }} useFlexGap flexWrap="wrap" >
                <ReleaseCard />
                <SummaryCard />
            </Stack>

        </div>

    )
}