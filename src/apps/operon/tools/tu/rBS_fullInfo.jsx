import React, { Component } from 'react'
//import { IconButton } from '../../../../components/ui-components/ui_components'
import { RowInfo } from './bs_compnents/fullInfo_Rows'


// eslint-disable-next-line no-unused-vars
const styleIconButton = {
    width: "20px",
    height: "20px",
    float: "left"
}

export class RBSbyFull extends Component {
    constructor(props) {
        super(props);
        this.state = { _order: this.props.data };
    }

    /*
    toUp(index, order) {
        let newOrder = order
        const origen = order[index]
        const destino = order[index - 1]
        newOrder[index - 1] = origen
        newOrder[index] = destino

        this.setState({ _order: newOrder })
    }
    
    toDown(index, order, set_order) {
        let newOrder = order
        const origen = order[index]
        const destino = order[index + 1]
        newOrder[index + 1] = origen
        newOrder[index] = destino

        this.setState({ _order: newOrder })
    }*/

    render() {
        const {
            type,
            data
        } = this.props
        let dta
        switch (type) {
            case "gene":
                dta = data.genes
                if (dta) {
                    //console.log(dta)
                    return (
                        <div>
                            {
                                dta.map(gene => {
                                    return (RowInfo(formatData(gene, "Genes")))
                                })
                            }
                        </div>
                    )
                }
                return <>no gene</>
            case "promoter":
                dta = data.promoter
                if(dta){
                    //console.log(data)
                    return RowInfo(formatData(dta, "Promoter"))
                }
                break
            case "regulator":
                //data = data.regulatorBindingSites
                break;
            default:
                return <>no type selected</>
        }
        return <></>
    }
}

function formatData(data, type) {
    let formatData = []
    //console.log(data)
    try {
        data.regulatorBindingSites.map(bs => {
            try {
                bs.regulatoryInteractions.map(ri => {
                    const rs = ri?.regulatorySite
                    formatData.push({
                        idSite:  ri?._id,
                        info: `Linked to Promoter ${data?.name} regulated by ${bs?.regulator?.name}`,
                        function: bs?.function,
                        sequenceInfo: {
                            sequence: rs?.sequence,
                            posL: rs?.leftEndPosition,
                            posR: rs?.rightEndPosition
                        },
                        center: ri?.centerPosition,
                        absolute: rs?.absolutePosition,
                        citations: ri?.citations
                    })

                    return null
                })
            } catch (error) {
                console.error("no existen: regulatoryInteractions:_", error)
            }
            return null
        })
    } catch (error) {
        console.error("no existen: regulatorBindingSites:_", error)
    }
    //console.log(formatData)
    return formatData
}

export default RBSbyFull



