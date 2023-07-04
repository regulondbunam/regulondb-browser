import React from "react";
import { Cover } from "../../components/ui-components";
import ObjectListExplorer from "../../components/objectListExplorer";
import { useGetObjectList } from "../../components/webservices";

export default function Home() {

    const { objectsList, loading, error } = useGetObjectList({ datamartType: "regulon" })
    let state = "done"
    let title = "Regulons"
    if (loading) {
        state = "loading"
        title = "loading Regulon list"
    }
    if (error) {
        state = "error"
        title = "... Sorry, we have an error, try again later 🥲"
    }

    const attributesEnabled=[
        "_id",
        "productsName",
        "encodedGenes",
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