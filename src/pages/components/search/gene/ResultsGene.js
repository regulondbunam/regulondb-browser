import React from 'react';
import {useQuery, gql} from '@apollo/client'
//import {SIM_SEARCH} from '../../apollo/Querys'
import Image from '../../ui-components/infoDisplay/media/Image'
import Table from './TEST_Tableo2xp'

//https://dl.dropboxusercontent.com/s/pp47gwivftzav85/tenor.gif?dl=0

const furret = 'https://dl.dropboxusercontent.com/s/pp47gwivftzav85/tenor.gif?dl=0'

const QUERY_ADV = gql`
query countGenes($advancedSearch: String){
    getGenesBy(limit:10 page: 0 advancedSearch:$advancedSearch)
      {
        geneInfo{
          id
          name
          
        }
      }
    
    }
`

const ResultsGene = ({
    search,
}) => {

    const advancedSearch = search+"[geneInfo.name]"

    const { data, loading, error } = useQuery(QUERY_ADV, {
        variables: { advancedSearch }
    })
    
    // console.log("data: ",data)
    // console.log("loading",loading)
    console.log("erroo",error)

    if (loading) {
        return (
            <div style={{}}>
                <Image urlImage={furret} id={"asd5236a"} />
            </div>
        );
    } else {
        if(data === undefined){
            return(<></>)
        }else{
            return (
                <div>
                    <TabGeneResult data={data} />
                    {getColumns(data)}
                </div>
    );
        }
        
    }

}

function getColumns (data){
    const genesResult = data.getGenesBy
    const h = genesResult.map((gen) => {
        const gene = gen.geneInfo
        return (
            gene.id
        )
    })

    console.log(h)

}

function TabGeneResult(data) {
    const genesResult = data.data.getGenesBy
    return (
        <div style={{ width: "80%", height: "100%" }}>
            <table >
                <tbody>
                    {genesResult.map((gen) => {
                        const gene = gen.geneInfo
                        return (
                            <tr  key={gene.id}>
                                    <td >{gene.name}</td>
                                    <td >Gene{gene.note}</td>
                            </tr>
                        )

                    })
                    }
                </tbody>
            </table>


        </div>
    )
}
 
export default ResultsGene;