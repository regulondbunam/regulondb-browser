import React, { Component } from 'react';
import Button from '../components/ui-components/basicInput/Buttons'

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
                <div>
                    Holas
                </div>
            </>
         );
    }
}


export default GeneTabs;