import React from 'react';
import GeneTabs from './gene/GeneTabs'
import CoverLoading from './components/loading/CoverLoading'
import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";
import { withRouter } from 'react-router-dom';

const GetGeneName = gql`
query countGenes($advancedSearch: String!){
  getGenesBy(limit:1 page: 0 advancedSearch:$advancedSearch)
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
        const state = `please wait we are querying the id ${idgene}`
        return (
            <>
                {CoverLoading(state,'loading')}
            </>
        );
    }
    if (error) {
        const state = "Sorry for the inconvenience, we have a problem with our service, we are already working to solve it, try again later"
        console.log(error)
        return (
            //error en sistema
            <>
                {CoverLoading(state,'error')}
            </>
        )
    }
    let geneName = ""
    try {
        geneName = data.getGenesBy.data[0].geneInfo.name
        return (
            <>
                <div >
                    {Title(geneName, idgene)}
                    <div>
                        <GeneTabs idGene={idgene} />
                    </div>
                </div>
            </>
        );
    } catch (error) {
        const state = `Sorry we couldn't find the identifier: ${idgene}`
        return (
            <>
                {CoverLoading(state,'error')}
            </>
        )
    }
}

function Title(geneName, geneID) {
        return (
            <div style={styleTitle}>
                <h1 style={{ color: "var(--color-accentB)", margin: "0", float: "left" }}>Gene &nbsp;</h1>
                <h1 style={{ margin: "0" }}>{geneName}</h1>
                <h3 style={{ margin: "0", fontSize: "9px" }}>{geneID}</h3>
            </div>
        )


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