import React, { Component } from 'react';
import Button from '../components/ui-components/basicInput/Buttons'
import GnDescription from './GeneDescription'

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
                <div className="tabHeader">
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
                </div>
                <div style={{paddingLeft: "10%", paddingTop: "2%"}}>
                    {
                        TabSelector(this.state.ActiveOption, idGene)
                    }
                </div>
            </>
         );
    }
}

function TabSelector(item, idGene){
    switch (item) {
        case "DESCRIPTION":
            return <GnDescription geneID={idGene} />
        case "PRODUCT":
            return <h3> a Product Info</h3>
        case "GROWTH CONDITIONS":
            return <h3>a Growth Conditions Info</h3>
        default:
            return <h3>Select a tab option</h3>
    }
}
export default GeneTabs;