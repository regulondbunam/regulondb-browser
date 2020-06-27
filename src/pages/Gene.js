import React from 'react';
import GeneTabs from './gene/GeneTabs'
import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";
import { withRouter } from 'react-router-dom';

const GetGeneName = gql`
query countGenes($advancedSearch: String!){
  getGenesBy(limit:10 page: 0 advancedSearch:$advancedSearch)
    {
        data{
            geneInfo{
                name
            }
        }
    }
  
  }
`

const Gene = ({
    location
}) => {
    const idgene = BreakPathName(location.pathname)
    const advancedSearch = idgene + "[geneInfo.id]"
    const { data, loading, error } = useQuery(GetGeneName, {
        variables: { advancedSearch }
    })

    // console.log("data: ",data)
    // console.log("loading",loading)
    // console.log("error",error)
    if (loading) {
        const state = "please wait we are querying the id"
        return (
            <>
                {Title(true, "", idgene, state)}
            </>
        );
    }
    if (error) {
        const state = "Sorry for the inconvenience, we have a problem with our service, we are already working to solve it, try again later"
        console.log(error)
        return (
            //error en sistema
            <>
                {Title(true, "", "", state)}
            </>
        )
    }

    let geneName = ""
    try {
        geneName = data.getGenesBy.data[0].geneInfo.name
    } catch (error) {
        const state = "Sorry we couldn't find the identifier"
        return (
            <>
                {Title(true, "", idgene, state)}
            </>
        )
    }
    return (
        <>
            <div >
                {Title(false, geneName, idgene)}
                <div>
                    <GeneTabs idGene={idgene} />
                </div>
            </div>
        </>
    );


}

function Title(error, geneName, geneID, state) {
    if (!error) {
        return (
            <div style={styleTitle}>
                <h1 style={{ color: "var(--color-accentB)", margin: "0", float: "left" }}>Gene &nbsp;</h1>
                <h1 style={{ margin: "0" }}>{geneName}</h1>
                <h3 style={{ margin: "0", fontSize: "9px" }}>{geneID}</h3>
            </div>
        )
    } else {
        return (
            <div style={styleTitle}>
                <h1 style={{ color: "var(--color-accentA)", margin: "5px", float: "left" }}>
                    {state} &nbsp;</h1>
                <h1 style={{ margin: "5px" }}>{geneID}</h1>
            </div>
        )
    }

}

function BreakPathName(pathname) {
    pathname = pathname.slice(6)
    return pathname
}

const styleTitle = {
    backgroundColor: "var(--color-grey5)",
    padding: "2% 10% 2% 10%"
}

export default withRouter(Gene);