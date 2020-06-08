import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

const Search = ({
    location
}) => {
    const search = BreakPathName(location.pathname)
    return ( 
        <>
        <h1>{search}</h1>
        </>
     );
}

function BreakPathName(pathname){
    pathname = pathname.slice(8)
    return pathname
}

export default withRouter(Search);