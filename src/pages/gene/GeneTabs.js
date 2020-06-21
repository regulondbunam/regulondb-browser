import React, { Component } from 'react';
import Button from '../components/ui-components/basicInput/Buttons'
import GnDescription from './GeneDescription'

const sections = ['DESCRIPTION','PRODUCT','OPERON','TRANSCRIPTION REGULATION', 'REFERENCES']

class GeneTabs extends Component {
    state = { ActiveOption: "DESCRIPTION" }

    onClick =(event)=>{
        this.setState({ActiveOption: event.target.id})
    }

    render() { 
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
                    <br/>
                </div>
                <div style={{paddingLeft: "10%"}}>
                    {
                        TabSelector(this.state.ActiveOption)
                    }
                </div>
            </>
         );
    }
}

function TabSelector(item){
    switch (item) {
        case "DESCRIPTION":
            return <GnDescription />
        case "PRODUCT":
            return <h3> a Product Info</h3>
        case "OPERON":
            return <h3>a Operon Info</h3>
        case 'TRANSCRIPTION REGULATION':
            return <h3>a Transcription Info </h3>
        case 'REFERENCES':
            return <h3>a Gene Referneces</h3>
        default:
            return <h3>Select a tab option</h3>
    }
}
export default GeneTabs;