import React from "react";
import { Cover } from "../../components/ui-components";
import ObjectListExplorer from "../../components/objectListExplorer";
import { useGetObjectList } from "../../components/webservices";

export default function Home() {

    const { objectsList, loading, error } = useGetObjectList({ datamartType: "gene" })
    let state = "done"
    let title = "Genes"
    if (loading) {
        state = "loading"
        title = "loading gene list"
    }
    if (error) {
        state = "error"
        title = "... Sorry, we have an error, try again later 🥲"
    }

    const attributesEnabled = [
        "_id",
        "name",
        "synonyms",
        "productsName"
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