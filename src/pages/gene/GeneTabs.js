import React, { Component } from 'react';
import Button from '../components/ui-components/basicInput/Buttons'
import GnDescription from './GeneDescription'
import GnProducts from './GeneProduct'

const sections = ['DESCRIPTION','PRODUCT','GROWTH CONDITIONS']

class GeneTabs extends Component {
    state = { ActiveOption: "DESCRIPTION" }

    onClick =(event)=>{
        this.setState({ActiveOption: event.target.id})
    }

    render() { 

        const{
            idGene
        }=this.props

        return ( 
            <>
                <nav className="tabHeader">
                    {
                        sections.map((item)=>{
                            let styleTab = "tab"
                            if(this.state.ActiveOption === item){
                                styleTab = "tabActive"
                            }
                            return(
                                <div key={item} className="tabContent">
                                    <Button id={item} className={styleTab} label={item} onClick={this.onClick}/>
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

function TabSelector(item, idGene){
    switch (item) {
        case "DESCRIPTION":
            return <GnDescription geneID={idGene} />
        case "PRODUCT":
            return <GnProducts geneID={idGene} />
        case "GROWTH CONDITIONS":
            return <h3>a Growth Conditions Info</h3>
        default:
            return <h3>Select a tab option</h3>
    }
}
export default GeneTabs;