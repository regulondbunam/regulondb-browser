import React from "react";
import { Cover } from "../../components/ui-components";
import ObjectListExplorer from "../../components/objectListExplorer";
import { useGetObjectList } from "../../components/webservices";


function Home() {

    const { objectsList, loading, error } = useGetObjectList({ datamartType: "operon" })
    let state = "done"
    let title = "Operons"
    if (loading) {
        state = "loading"
        title = "loading operon list"
    }
    if (error) {
        state = "error"
        title = "... Sorry, we have an error, try again later 🥲"
    }

    const attributesEnabled = [
        "_id",
        "name"
    ]

    return (
        <div>
            <Cover state={state} >
                <h1>{title}</h1>
            </Cover>
            <div style={{marginLeft: "3%"}}>
                {objectsList && !error
                    ? (<ObjectListExplorer attributesEnabled={attributesEnabled} objectsList={objectsList} />)
                    : null}
            </div>
        </div>
    )
}

export default Home;