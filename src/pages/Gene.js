import React from 'react';
import GeneTabs from './gene/GeneTabs'
import {withRouter} from 'react-router-dom';

const Gene = ({
    location
}) => {
    const gene = BreakPathName(location.pathname)
    return ( 
        <>
        <div >
        <div style={styleTitle}>
        <h1 style={{color: "var(--color-accentB)", margin: "0"}}>Gene </h1>
        </div>
        <div>
        <GeneTabs />
        </div>
        
        </div>
        
        </>
     );
}


function BreakPathName(pathname){
    pathname = pathname.slice(6)
    return pathname
}

const styleTitle = {
    backgroundColor: "var(--color-grey5)",
    padding: "2% 10% 2% 10%"
}
 
export default withRouter(Gene);