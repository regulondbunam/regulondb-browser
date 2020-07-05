import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GrowthConditions } from '../../components/apollo/geneCollection'

const TabGrowthConditions = ({
    idGene
}) => {
    const growthConditions = new GrowthConditions(idGene)
    const advancedSearch = growthConditions.advancedSearch
    const { data, loading, error } = useQuery(growthConditions.query, {
        variables: { advancedSearch }
    })
    if(loading){
        return <>Loading..</>
    }
    if(error){
        console.log(error)
        return <>Server Error</>
    }
    try {
        console.log(data.getGenesBy.data[0].growthConditions)
        const growthc = data.getGenesBy.data[0].growthConditions
        return ( 
            <table>
                <thead>
                    <tr>
                        <th>
                            Contrast
                        </th>
                        <th>
                            Effect
                        </th>
                        <th>
                            Evidence and Reference
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        growthc.map((item)=>{
                            return(
                                <tr key={"asdfea"}>
                                    <td>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        {`C: ${item.controlCondition}`}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        {`E: ${item.experimentalCondition}`}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td>
                                        {item.effect}
                                    </td>
                                    <td>

                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
         );
    } catch (error) {
        console.log(error)
        return <>Client error</>
    }
}
 
export default TabGrowthConditions;