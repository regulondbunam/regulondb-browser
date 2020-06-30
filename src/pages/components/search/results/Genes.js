import React from 'react';
import MarckStr from '../../utiles/MarkStr'
import { useHistory } from 'react-router-dom';



//https://dl.dropboxusercontent.com/s/pp47gwivftzav85/tenor.gif?dl=0

//const furret = 'https://dl.dropboxusercontent.com/s/pp47gwivftzav85/tenor.gif?dl=0'

const ResultsGene = ({
    search,
    data
}) => {
    let history = useHistory();
    return (
        <div style={{ width: "80%", height: "100%" }}>
            <table >
                <thead>
                    <tr>
                        <td> </td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((gen) => {
                        const gene = gen.geneInfo
                        const prod = gen.products
                        let products = ""
                        products += prod.map((product) => {
                            return (
                                `${product.name}, `
                            )
                        })
                        let text = `${gene.name} gene; `
                        if(gene.synonyms.length> 0){
                            text += `synonyms: ${gene.synonyms}; `
                        }
                        
                        if(prod.length > 0){
                            text += `products: ${products}`
                        }

                        return (

                            <tr key={gene.id} className="trClickable" onClick={() => { history.push("/gene/" + gene.id) }}>
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