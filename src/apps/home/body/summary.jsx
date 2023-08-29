import { gql, useQuery } from "@apollo/client"
import Skeleton from '@mui/material/Skeleton';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import BarChartIcon from '@mui/icons-material/BarChart';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";

const query_GetDataBaseInfo = gql`{
    getDatabaseInfo{
        statistics{
          genes{
            total
          }
          operon{
            total
          }
          regulons{
            total
          }
          promoters{
            total
          }
          transcriptionUnits{
            total
          }
        }
    }
}`

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flexGrow: 1,
}));

export function SummaryCard() {
    const { data, loading, error } = useQuery(query_GetDataBaseInfo)
    if (error) {
        return null
    }
    if (loading) {
        return <Skeleton variant="rectangular" width={347} height={120} />
    }
    if (data) {
        const statistics = data.getDatabaseInfo[0].statistics
        console.log(statistics);
        return (
            <Box>
                <Paper elevation={3} >
                    <List>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <BarChartIcon sx={{ fontSize: 100 }} />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Summary"
                                secondary={
                                    <>
                                        <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                                            <Item>
                                                {statistics.genes?.total && (<p><b>{statistics.genes.total}</b></p>)}
                                                <p><b>Genes</b></p>
                                            </Item>
                                            <Item>
                                                {statistics.operon?.total && (<p><b>{statistics.operon.total}</b></p>)}
                                                <p><b>Operon</b></p>
                                            </Item>
                                            <Item>
                                                {statistics.regulons?.total && (<p><b>{statistics.regulons.total}</b></p>)}
                                                <p><b>Regulon</b></p>
                                            </Item>
                                            <Item>
                                                {statistics.transcriptionUnits?.total && (<p><b>{statistics.transcriptionUnits.total}</b></p>)}
                                                <p><b>Transcription Units</b></p>
                                            </Item>
                                            <Item>
                                                {statistics.promoters?.total && (<p><b>{statistics.promoters.total}</b></p>)}
                                                <p><b>Promoters</b></p>
                                            </Item>
                                        </Stack>
                                        <Link to={"/summaryHistory"}>
                                            <Typography color="secondary">
                                                View Summary
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
