import React from "react";
import { useParams } from "react-router-dom";
import Results from './results';

function Search() {
    let { keyword } = useParams()
    return <Results keyword={keyword} />
}

export default Search;