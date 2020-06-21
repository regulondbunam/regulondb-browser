import React, { Component } from 'react';
import Button from '../components/ui-components/basicInput/Buttons'

const sections = []

class GeneTabs extends Component {
    state = { ActiveOption: "default" }
    render() { 
        return ( 
            <>
                <div className="tabHeader">
                    <Button className="tabActive" label="Hola"/>
                </div>
                <div>
                    Hola
                </div>
            </>
         );
    }
}


export default GeneTabs;