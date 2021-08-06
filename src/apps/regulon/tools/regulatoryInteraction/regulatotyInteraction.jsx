import React, { useState } from 'react'
import Interaction from './interaction'
import Genes from './genes'
import { RBS } from './rBS'

export function RegulatotyInteraction({ ri = {}, display_ri = true }) {

    const [_display, set_display] = useState(display_ri)

    return (
        <div>
            <table>
                <thead>
                    <tr className="tableContent-th-title">
                        <th>
                            Interaction {ri?.regulator?.name} - {ri?.regulatedEntity?.name}
                        </th>
                    </tr>
                    {
                        _display
                        ?null
                        :<td><button onClick={()=>{set_display(true)}} className="aBase" >show Info...</button></td>
                    }
                    <tr>
                        
                    </tr>
                </thead>
                {
                    _display
                        ? <tbody >
                            <tr>
                                <td>
                                    {
                                        ri?.distanceToPromoter
                                            ? `Distance: ${ri?.distanceToPromoter} to Promoter and ${ri?.distanceToFirstGene} to first Gene `
                                            : `Distance Unknown`
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
                            <tr>
                                <td><button onClick={()=>{set_display(false)}} className="aBase" >Hide...</button></td>
                            </tr>
                        </tbody>
                        : null
                }
            </table>

        </div>
    )
}
