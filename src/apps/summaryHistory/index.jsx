/**
# Component (user guide)

# SummaryHistory
	
## Description  
	
It performs a GraphQL query to obtain data from a summary history and displays that data in a table.

## Category   
Functional 

## Live demo 
--

## Installation or Implementation
--

## Usage 
	
example: <SummaryHistory/> 

## Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|           |      |         |             |


## Exception
--

## License

MIT License

## Author 
	
RegulonDB Team: 


# Component (technical guide)

## Component Type 
Visual

## Dependencies
query_getSumaryHistoryData: GraphQL query to obtain historical summary data.

useQuery: Apollo Client hook to perform GraphQL queries on React components.

TableView: Component used to display data in table form in the user interface.

Cover: Visual presentation component used to add visual elements, such as loading messages or headers, around the main content in the user interface.

## States

|Property | Value  | Description                                     |
|---------|--------|-----------------------------------------------  | 
|loading  | Boolean| Indicates if the GraphQL query is in process.   |
|error    | String | Stores an error message if the query fails.     |
|data     | Varies | Stores the data obtained from the GraphQL query.|

## Hooks
|Name     | Description                                   | Syntax                                            | Additional Notes or References                                                           |
|-------- | --------------------------------------------- | ------------------------------------------------- | -----------------------------------------------------------------------------------------|
|useQuery | Apollo Client Hook for GraphQL queries        | const { loading, error, data } = useQuery(query); | [Apollo Client Hooks](https://www.apollographql.com/docs/react/api/react/hooks/#usequery)|


 
**/
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

    if (data) //console.log(data);
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