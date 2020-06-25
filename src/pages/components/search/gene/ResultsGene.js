import React from 'react';
import MarckStr from '../../utiles/MarkStr' 
import { useHistory } from 'react-router-dom';
import {SearchGene} from '../../apollo/geneCollection'
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
        return (<p>{`${error}`}</p>)
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
                        <td> </td>
                    </tr>
                </thead>
                <tbody>
                    {genesResult.map((gen) => {
                        const gene = gen.geneInfo
                        const prod = gen.products
                        let products = ""
                        products += prod.map((product) => {
                            return(
                                ", "+product.name
                            )
                        })
                        let text = gene.name+' Gene, synonyms: '+gene.synonyms+' products gene: '+products
                        
                        return (
                                
                                <tr  key={gene.id} className="trClickable" onClick={() => {history.push("/gene/"+gene.id)}}>
                                    <td dangerouslySetInnerHTML={{ __html: MarckStr(search, text) }}></td>
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