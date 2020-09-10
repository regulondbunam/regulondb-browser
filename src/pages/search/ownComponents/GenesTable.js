import React, {Component} from 'react';
import MarckStr from '../../../components/utiles/MarkStr'
import { Link } from 'react-router-dom';

class GenesTable extends Component {
    state = { data: [] };

    addData = (data = []) =>{
        this.setState({data: data})
    }

    render() { 
        const {
            search
        } = this.props
        const {
            data
        } = this.state
        if(data.length>1){
            console.log(data)
            try {
                return (
                    <div style={{ width: "80%", height: "100%" }}>
                        <table >
                            <thead>
                                <tr>
                                    <th> Genes </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((gen) => {
                                    const gene = gen.gene
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
                                    //console.log(text)
                                    return (
            
                                        <tr key={gene.id} className="trClickable">
                                            <Link to={"/gene/" + gene.id}>
                                            <td dangerouslySetInnerHTML={{ __html: MarckStr(search, text) }}></td>
                                            </Link>
                                        </tr>
            
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                )
            } catch (error) {
                console.log(error)
                return <>estructural data error</>
            }
        }
        return (
            <table >
                            <thead>
                                <tr>
                                    <th> Genes Loading ... </th>
                                </tr>
                            </thead>
            </table>
        )
    }
}
 
export default GenesTable;
