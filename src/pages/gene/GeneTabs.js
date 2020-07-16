import React, { Component } from 'react';
import Button from '../components/ui-components/basicInput/Buttons'
import GnDescription from './GeneDescription'
import GnProducts from './GeneProduct'
import GnGrowthC from './GeneGrowthConditions'
import GnAllInfo from './GeneAllInfo'

const sections = ['ALL','DESCRIPTION', 'PRODUCT', 'GROWTH CONDITIONS']

class GeneTabs extends Component {
    state = { ActiveOption: 'ALL' }

    onClick = (event) => {
        this.setState({ ActiveOption: event.target.id })
    }

    render() {

        const {
            idGene,
            prodCount,
            gwcCount
        } = this.props

        return (
            <>
                <nav className="tabHeader">
                    {
                        sections.map((item) => {
                            let styleTab = "tab"
                            if (this.state.ActiveOption === item) {
                                styleTab = "tabActive"
                            }
                            let number = ''
                            switch (item) {
                                case "PRODUCT":
                                    if (prodCount === 0) {
                                        return null
                                    }
                                    number = '('+prodCount+')'
                                    break;
                                case "GROWTH CONDITIONS":
                                    if (gwcCount === 0) {
                                        return null
                                    }
                                    number = '('+gwcCount+')'
                                    break;
                                default:
                                    break;
                            }
                            return (
                                <div key={item} className="tabContent">
                                    <Button id={item} className={styleTab} label={`${item}${number}`} onClick={this.onClick} />
                                </div>
                            )
                        })
                    }
                </nav>
                <>
                    {
                        TabSelector(this.state.ActiveOption, idGene)
                    }
                </>

            </>
        );
    }
}

function TabSelector(item, idGene) {
    switch (item) {
        case "DESCRIPTION":
            return <GnDescription geneID={idGene} />
        case "PRODUCT":
            return <GnProducts geneID={idGene} />
        case "GROWTH CONDITIONS":
            return <GnGrowthC geneID={idGene} />
        case "ALL":
            return <GnAllInfo idGene={idGene} />
        default:
            return <h3>Select a tab option</h3>
    }
}
export default GeneTabs;