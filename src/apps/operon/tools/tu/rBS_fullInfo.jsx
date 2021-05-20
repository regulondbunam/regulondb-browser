import React, { useState, useEffect, Component } from 'react'
import { IconButton } from '../../../../components/ui-components/ui_components'
import {RowInfo} from './bs_compnents/fullInfo_Rows'


const styleIconButton = {
    width: "20px",
    height: "20px",
    float: "left"
}

const thStyle = { fontWeight: "bold",fontSize: "10px" }

const tbTitle = {
    fontWeight: "bold",
    borderBottom: "1px solid #72A7C7",
    textAlign: "inherit",
    fontSize: "10px",
}

export class RBSbyFull extends Component {
    constructor(props) {
        super(props);
        this.state = { _order: this.props.data?.promoter};
    }

    set_order = () => {

    }

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
    }

    render() {
        const {
            _order,
        } = this.state
        
        if (_order) {
            return (
                <div>
                    {
                        _order.map((bs, index) => {
                            return (
                                <table key={`Table_bsFull_${bs?._id}_${index}`}>
                                    <thead>
                                        <tr>
                                            <th style={tbTitle} colSpan="3" >{bs?._id}</th>
                                            <th >
                                                {
                                                    index === 0
                                                        ? <IconButton icon="arrow_upward" onClick={() => { this.toUp(index, _order) }} disabled style={styleIconButton} iconStyle={{ fontSize: "14px" }} />
                                                        : <IconButton icon="arrow_upward" onClick={() => { this.toUp(index, _order) }} style={styleIconButton} iconStyle={{ fontSize: "14px" }} />
                                                }
                                                {
                                                    index === _order.length - 1
                                                        ? <IconButton icon="arrow_downward" onClick={() => { this.toDown(index, _order) }} disabled style={styleIconButton} iconStyle={{ fontSize: "14px" }} />
                                                        : <IconButton icon="arrow_downward" onClick={() => { this.toDown(index, _order) }} style={styleIconButton} iconStyle={{ fontSize: "14px" }} />
                                                }

                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <RowInfo bs={bs}/>
                                    </tbody>
                                </table>
                            )
                        })
                    }
                </div>
            )
        }
        return <></>
    }
}


export default RBSbyFull



