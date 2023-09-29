import React from "react";
import { useParams } from "react-router-dom";
import Results from './results';
import CoexpressionResults from "./coexpression";

function Search() {
    let { keyword } = useParams()
    if(/coexpression/.test(keyword)){
        return <CoexpressionResults keyword={keyword} />
    }
    return <Results keyword={keyword} />
}

export default Search;