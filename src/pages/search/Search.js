import React from 'react';
import {withRouter} from 'react-router-dom';
import ResultsGene from '../components/search/gene/ResultsGene'

const Search = ({
    location
}) => {
    const search = BreakPathName(location.pathname)
    return ( 
        <>
        <h1>Results for: {search}</h1>
        <ResultsGene search={search}></ResultsGene>
        </>
     );
}

function BreakPathName(pathname){
    pathname = pathname.slice(8)
    return pathname
}

export default withRouter(Search);