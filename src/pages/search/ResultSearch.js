import React, { Component} from 'react';
import CoverSearch from './ownComponents/CoverSearch'
//import { SearchGene } from '../components/apollo/GeneCollection'
//import { useQuery } from '@apollo/react-hooks';
import Button from '../components/ui-components/basicInput/Buttons'
//import Genes from '../components/search/results/Genes'
import GeneResults from './GeneResults'
//import Gene from '../components/apollo/GeneCollection';

const colecciones = ["Genes", "Gensor Unit", "Operon", "Regulon", "Sigmulon", "sRNA", "Grow Conditions"]


class ResultState extends Component {
    state = { nFound: 0, nGene: 0 };

    addnGene=(count = 0)=>{
        console.log("hi")
        this.setState({
            nGene: count,
            nFound: this.state.nFound + count
        })
    }

    render() {
        const {
            search
        } = this.props
        const {
            nFound,
            nGene
        } = this.state
        return (
            <>
                {
                    CoverSearch(`Results for: ${search} (${nFound})`, 'search')
                }
                <div>
                    {
                        colecciones.map((item) => {
                            return (
                                <div key={item} style={{ paddingRight: "2%", float: "left" }}>
                                    {
                                        item !== "Genes"
                                            ? <Button className="aButton aDisabled" active={false} style={bbtnStyle} label={item} />
                                            : <Button className="aButton" style={bbtnStyle} label={item + "(" + nGene + ") "} />
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </>
        );
    }
}

class ResultSearch extends Component {
    constructor(props) {
        super(props);
        this.resultState = React.createRef();
    }

    _UpdateResultState = (count) =>{
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
                <GeneResults search={search} resoultsFound={this._UpdateResultState} />
            </>
        );
    }
}
 

const bbtnStyle = {
    fontSize: "14px",
}

export default ResultSearch;
