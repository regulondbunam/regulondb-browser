import React from 'react';
import MarckStr from '../../utiles/MarkStr' 
import { useHistory } from 'react-router-dom';
import Gene, {SearchGene} from '../../apollo/geneCollection'
//import Spinner from '../../loading/Spinner'


//https://dl.dropboxusercontent.com/s/pp47gwivftzav85/tenor.gif?dl=0

//const furret = 'https://dl.dropboxusercontent.com/s/pp47gwivftzav85/tenor.gif?dl=0'

const ResultsGene = ({
    search,
}) => {

    let searchGene = new SearchGene(search)

    const { data, loading, error} = searchGene

    //console.log("data: ",data)
    // console.log("loading",loading)
    //console.log("erroo", error)

    if (loading) {
        return (
            <div style={{}}>
                Loading...
            </div>
        );
    } else {
        if (data === undefined) {
            return (<></>)
        } else {
            return (
                <div>
                    <TabGeneResult data={data} search={search} />
                </div>
            );
        }

    }

}


function TabGeneResult({data,search}) {
    let history = useHistory();
    //console.log(data)
    const genesResult = data.getGenesBy.data
    return (
        <div style={{ width: "80%", height: "100%" }}>
            <table >
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Products</td>
                        <td>Notes</td>
                    </tr>
                </thead>
                <tbody>
                    {genesResult.map((gen) => {
                        const gene = gen.geneInfo
                        const prod = gen.products
                        return (
                            
                                <tr  key={gene.id} className="trClickable" onClick={() => {history.push("/gene/"+gene.id)}}>
                                    <td >{gene.name} Gene</td>
                                    {
                                        prod.map((product) => {
                                            return(
                                            <td key={product.regulatorId} dangerouslySetInnerHTML={{ __html: MarckStr(search, product.name) }}></td>
                                            )
                                        }

                                        )
                                    }
                                    <td dangerouslySetInnerHTML={{ __html: MarckStr(search,gene.note) }}></td>
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