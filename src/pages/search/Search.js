import React from 'react';
import {withRouter} from 'react-router-dom';
import ResultsGene from '../components/search/gene/ResultsGene'

const Search = ({
    location
}) => {
    const search = BreakPathName(location.pathname)
    return (
        <>
        <div style={{backgroundColor: "#666666"}}>
        <h1 style={{color: "#ffffff"}}>Results for: {search}</h1>
        </div>
        <div style={{ marginLeft: "10%", marginRight: "10%", width: "100%", height: "100%" }}>
        <ResultsGene search={search}></ResultsGene>
        </div>
        </>
        
     );
}

function BreakPathName(pathname){
    pathname = pathname.slice(8)
    return pathname
}

export default withRouter(Search);