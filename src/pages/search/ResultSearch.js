import React, { Component } from 'react';
import CoverSearch from './ownComponents/CoverSearch'
import GeneResults from '../../components/search/GeneResults'

const colecciones = ["Genes", "Gensor Unit", "Operon", "Regulon", "Sigmulon", "sRNA", "Grow Conditions"]


class ResultState extends Component {
    state = { nGene: 0 };

    addnGene = (count = 0) => {
        //console.log("hi")
        this.setState({
            nGene: count,
        })
    }



    render() {
        const {
            search
        } = this.props
        const {
            nGene
        } = this.state
        const nFound = nGene + 0
        return (
            <>
                {
                    CoverSearch(`Results for: ${search} (${nFound})`, 'search')
                }
                <article style={{paddingTop: "5px"}}>
                    {
                        colecciones.map((item) => {
                            return (
                                <div key={item} style={{ paddingRight: "2%", float: "left" }}>
                                    {
                                        item !== "Genes"
                                            ? <p className="aBase">{`${item} (0)`}</p>
                                            : <p className="aBase" >{`${item} (${nGene})`}</p>
                                    }
                                </div>
                            )
                        })
                    }
                </article>
            </>
        );
    }
}

class ResultSearch extends Component {
    constructor(props) {
        super(props);
        this.resultState = React.createRef();
    }

    _UpdateResultState = (count) => {
        console.log(this.resultState.current)
        this.resultState.current.addnGene(count)
    }


    render() {
        const {
            search
        } = this.props
        return (
            <>
                    <ResultState search={search} ref={this.resultState} />
                <article>
                    <GeneResults search={search} resoultsFound={this._UpdateResultState} />
                </article>

            </>
        );
    }
}


export default ResultSearch;
