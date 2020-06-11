import React from 'react';
import {withRouter} from 'react-router-dom';
import ResultsGene from '../components/search/gene/ResultsGene'
import Button from '../components/ui-components/basicInput/buttons/Button'

const colecciones = ["Genes", "Gensor Unit", "Operon", "Regulon", "Sigmulon", "sRNA", "Grow Conditions"]

const Search = ({
    location
}) => {
    const search = BreakPathName(location.pathname)
    return (
        <>
        <div style={styleTitle}>
        <h1 style={{color: "#ffffff", margin: "0"}}>Results for: {search}</h1>
        </div>
        <div style={styleBody}>
            <div style={{width: "auto"}}>
            {
                colecciones.map((item)=>{
                    return (
                        <div style={{paddingRight: "2%", float: "left"}}>
                        <Button style={{fontSize: "14px"}} key={item} label={item}/>
                        </div>
                    )
                })
            }
        </div>
        <div>
            <ResultsGene search={search} />
        </div>
        </div>
        </>
        
     );
}



function BreakPathName(pathname){
    pathname = pathname.slice(8)
    return pathname
}

const styleBody = {
    padding: "2% 10% 2% 10%",
    display: "flex"
}

const styleTitle = {
    backgroundColor: "#666666",
    padding: "2% 10% 2% 10%"
}

export default withRouter(Search);