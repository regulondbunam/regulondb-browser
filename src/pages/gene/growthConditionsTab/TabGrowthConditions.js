import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GrowthConditions } from '../../components/apollo/GeneCollection'

const TabGrowthConditions = ({
    idGene
}) => {
    const growthConditions = new GrowthConditions(idGene)
    const advancedSearch = growthConditions.advancedSearch
    const { data, loading, error } = useQuery(growthConditions.query, {
        variables: { advancedSearch }
    })
    if (loading) {
        return <>Loading..</>
    }
    if (error) {
        console.log(error)
        return <>Server Error</>
    }
    try {
        //console.log(data.getGenesBy.data[0].growthConditions)
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
                        growthc.map((item) => {
                            let effectStyle = {color: "#000000"}
                            switch (item.effect) {
                                case 'induce':
                                    effectStyle = {color: 'Green'}
                                    break;
                                case 'repressed':
                                    effectStyle = {color: 'Red'}
                                    break;
                                default:
                                    break;
                            }
                            return (
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
                                                    <td dangerouslySetInnerHTML={{ __html: `E: ${DetailDifference(item.controlCondition, item.experimentalCondition)}` }}>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td style={effectStyle}>
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

function DetailDifference(control, experimental) {
    console.log(experimental)
    try {
        const controlSections = control.split('|')
        const experimentalSections = experimental.split('|')
        experimental = ''
        for (let index in controlSections) {
            const cItem = controlSections[index]
            const eItem = experimentalSections[index]
            if(cItem === eItem){
                experimental += `${eItem}| `
            }else{
                experimental += `<b>${eItem}</b>|`
            }
        }
        return experimental
    } catch (error) {
        console.log(error)
        return(experimental)
    }
}

export default TabGrowthConditions;