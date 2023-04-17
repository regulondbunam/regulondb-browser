import { gql, useQuery } from "@apollo/client"
import Skeleton from '@mui/material/Skeleton';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

const query_GetDataBaseInfo = gql`{
    getDatabaseInfo{
        regulonDBVersion
        ecocycVersion
        lcVersion
        releaseDate
        note
    }
}`

export function ReleaseCard() {
    const { data, loading, error } = useQuery(query_GetDataBaseInfo)
    if (error) {
        return null
    }
    if (loading) {
        return <Skeleton variant="rectangular" width={347} height={120} />
    }
    if (data) {
        const dbInfo = data.getDatabaseInfo[0]
        return (
            <Box>
                <Paper elevation={3} >
                    <List>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <NewspaperIcon sx={{ fontSize: 100 }} />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Release"
                                secondary={
                                    <>
                                        <p>{"RegulonDB version: " + dbInfo.regulonDBVersion} </p>
                                        <p>{"Release date: " + dbInfo.releaseDate}</p>
                                        <p>{"Ecocyc version: " + dbInfo.ecocycVersion}</p>
                                        <p>{"LC version: " + dbInfo.lcVersion}</p>
                                        <Link to={"/"}>
                                            <Typography color="secondary">
                                                Read realease notes
                                            </Typography>
                                        </Link>

                                    </>
                                }
                            />
                        </ListItem>
                    </List>
                </Paper>
            </Box>
        )
    }
    return null
}
