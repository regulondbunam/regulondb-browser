import React, { useEffect } from "react";
import Gene from "../search/results/Gene"
import { UpdateTitle } from "./components/Title";

export default function Home(){

    
    useEffect(() => {
        UpdateTitle({ title: "Gene", geneToken: undefined });
    })
    
    return (
        <article>
            <Gene keyword="RDB" />
        </article>
    )
}