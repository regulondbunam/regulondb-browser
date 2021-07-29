import React from 'react'
import { useParams } from "react-router-dom";
import Title from "./components/regulon_title"
import {Home} from "./regulon_home"

export default function Regulon() {
    const id = useParams().id;
    return(
        <>
            <Title/>
            {
                id ? "info" : <Home />
            }
        </>
    )
}