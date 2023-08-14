import React from "react";
import { Cover } from "../../components/ui-components";
import ObjectListExplorer from "../../components/objectListExplorer";
import { useGetObjectList } from "../../components/webservices";

export default function Home() {

    const { objectsList, loading, error } = useGetObjectList({ datamartType: "sigmulon" })
    let state = "done"
    let title = "Sigmulon List"
    if (loading) {
        state = "loading"
        title = "loading sigmulon list"
    }
    if (error) {
        state = "error"
        title = "... Sorry, we have an error, try again later 🥲"
    }

    const attributesEnabled=[
        "_id",
        "productsName",
        "encodedGenes",
        "sigmulonGeneName",
        "name",
        "synonyms"
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