import React from 'react'
import Interaction from './interaction'
import Genes from './genes'
import { RBS } from './rBS'

export function RegulatotyInteraction({ ri = {} }) {
    return (
        <div>
            <table>
                <thead>
                    <tr className="tableContent-th-title">
                        <th>
                            Interaction {ri?.regulator?.name} - {ri?.regulatedEntity?.name}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {
                                ri?.distanceToPromoter
                                ?`Distance: ${ri?.distanceToPromoter} to Promoter and ${ri?.distanceToFirstGene} to first Gene `
                                :`Distance Unknown`
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Interaction r={ri?.regulator} re={ri?.regulatedEntity} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Genes rGenes={ri?.regulatedGenes} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <RBS rbs={ri?.regulatoryBindingSites} />
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}
