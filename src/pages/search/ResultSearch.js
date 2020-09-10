import React, { Component } from 'react';
import GeneSearch from '../../components/apollo/dataMarts/gene/Search'
import GenesTable from './ownComponents/GenesTable'
import CoverSearch from './ownComponents/CoverSearch'

const colecciones = ["Genes", "Gensor Unit", "Operon", "Regulon", "Sigmulon", "sRNA", "Grow Conditions"]


class ResultState extends Component {
    state = { nGene: 0 };

    addnGene = (count = 0) => {
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
        this.genesTable = React.createRef();
    }

    _UpdateResultState = (count) => {
        //console.log(this.resultState.current)
        this.resultState.current.addnGene(count)
    }

    _UpdateResoltsData = (data) => {
        //console.log(this.genesTable)
        this.genesTable.current.addData(data)
    }


    render() {
        const {
            search
        } = this.props
        return (
            <>
                    <ResultState search={search} ref={this.resultState} />
                <article>
                    <GenesTable ref={this.genesTable} search={search} />
                </article>
                <GeneSearch search={search} limit={50} page={0} resoultsFound={this._UpdateResultState} resoultsData={this._UpdateResoltsData} />

            </>
        );
    }
}


export default ResultSearch;
