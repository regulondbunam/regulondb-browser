import React, { Component } from 'react';
import GeneSearch from '../../components/apollo/dataMarts/gene/Search'
import GenesTable from './ownComponents/GenesTable'
import CoverSearch from './ownComponents/CoverSearch'

const colecciones = ["Genes", "Gensor Unit", "Operon", "Regulon", "Sigmulon", "sRNA", "Grow Conditions"]


class ResultState extends Component {
    state = { nGene: 0, status: 'sleep' };

    setStatus = (status) => {
        console.log(status)
        this.setState({
            status: status
        })
    }

    setContGene = (count = 0) => {
        this.setState({
            nGene: count,
        })
    }

    render() {
        const {
            search
        } = this.props
        const {
            nGene,
            status
        } = this.state
        //console.log(status)
        let msj = ''
        let st = 'search'
        switch (status) {
            case 'loading':
                msj = `Searching ${search} Information`
                st = 'loading'
                break;
            case 'done':
                msj = `Search results for ${search} (${nGene})`
                if(nGene+0 < 1){
                    msj = 'We did not find any results'
                    st = 'error'
                }
                break;
            default:
                break;
        }

        return (
            <>
                {
                    CoverSearch(msj, st)
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

    _UpdateResoltsState = (status) =>{
        this.resultState.current.setStatus(status)
    }

    _UpdateResultCount = (count) => {
        this.resultState.current.setContGene(count)
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
                <GeneSearch search={search} limit={50} page={0} 
                    status={this._UpdateResoltsState}
                    resoultsFound={this._UpdateResultCount}
                    resoultsData={this._UpdateResoltsData}
                />

            </>
        );
    }
}


export default ResultSearch;
