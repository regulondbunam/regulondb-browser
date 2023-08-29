import { query_getSumaryHistoryData } from "./query"
import { useQuery } from '@apollo/client';
//import graphView from "./graphView"
import TableView from "./tableView";
import { Cover } from "../../components/ui-components"

export default function SummaryHistory() {

    const { loading, error, data } = useQuery(query_getSumaryHistoryData);

    if (loading) {
        return <Cover state={"loading"} >
            <h1>loading...</h1>
        </Cover>
    }
    if (error) return `Error! ${error.message}`

    if (data) console.log(data);
    return (
        <div>
            <Cover >
                <h1>Summary History</h1>
            </Cover>
            <TableView arraySummary={data.getDatabaseInfo} />
        </div>
    )
}
//<graphView/>