import { query_getSumaryHistoryData } from "./query"
import { useQuery } from '@apollo/client';
import graphView from "./graphView"
import TableView from "./tableView";

export default function SummaryHistory() {

    const  {loading, error, data} = useQuery(query_getSumaryHistoryData);

      if (loading) return  "loading"
      if (error) return `Error! ${error.message}`   

      if ( data ) console.log(data);
    return (
        <div>
            <>Hola soy Summary</>
            <graphView/>
            <TableView arraySummary={data.getDatabaseInfo} />
        </div>
    )
}   