import React from 'react';
import {useQuery} from '@apollo/client'
import {SIM_SEARCH} from '../../apollo/Querys'

const ResultsGene = ({
    search,
}) => {
    const { data, loading, error } = useQuery(SIM_SEARCH, {
        variables: { search }
    })
    console.log("data: ",data)
    console.log("loading",loading)
    console.log("erroo",error)

    if (loading) {
        return (
            <div style={{}}>
            </div>
        );
    } else {
        return (
            <div>
                    <div style={{ background: "#ffffff", width: "100%", height: "100%" }}>
                        <br />
                        <TabGeneResult data={data} />
                    </div>
            </div>
        );
    }

}

function TabGeneResult(data) {
    const genesResult = data.data.getGenesBy
    return (
        <div style={{ width: "80%", height: "100%" }}>
            <table >
                <thead>
                    <tr >
                        <th style={{ background: "#32617d", fontSize: "2vw", color: "#ffffff" }} colSpan="3">
                            Genes
                        </th>
                    </tr>
                    <tr >
                        <th >Gene Name</th>
                        <th >Description</th>
                    </tr>
                </thead>
                <tbody>
                    {genesResult.map((gen) => {
                        const gene = gen.geneInfo
                        //http://localhost:3000/organism/Ecoli?genebyid=RDBECOLIGN03690
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