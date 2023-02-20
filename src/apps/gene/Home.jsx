import React, { useEffect } from "react";
//import Gene from "../search/results/Gene"
import { ObjectListExplorer } from "../../components/ui-components";
import { UpdateTitle } from "./components/Title";

export default function Home(){

    
    useEffect(() => {
        UpdateTitle({ title: "Gene", geneToken: undefined });
    })

    const attributesEnabled=[
        "_id",
        "productsName",
        "name",
        "synonyms"
    ]
    
    return (
        <article>
            <ObjectListExplorer attributesEnabled={attributesEnabled} title='Gene' datamartType={"gene"} />
        </article>
    )
}