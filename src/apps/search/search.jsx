import React from 'react';
import { useParams } from "react-router-dom";
import Main from './main/Main';
import Results from './results/Results';

function Search() {
    let { keyword } = useParams() 
    if (keyword) {
        return ( 
            <Results keyword={keyword} />
         );
    }
    return <Main />;
}

export default Search;