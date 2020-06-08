import React, {Component} from 'react';
import Texbox from '../ui-components/basicInput/Text'
import Button from '../ui-components/basicInput/Buttons';
import {Link} from 'react-router-dom'

const placeHolder = 'Example: “araC AND arabinose”, “araC transcriptional regulator”'

class SearchTool extends Component {
    state = { inSearch: "" }

    UpdateSearch = (search) => {
        this.setState({ inSearch: search })
    }

    render() { 

        const {
            inSearch
        } = this.state

        return ( 
            <div style={styleSearch}>
                    <Texbox style={styleTexbox} placeholder={placeHolder} onChange={this.UpdateSearch}/>
                    <Link to={"/search/"+inSearch}>
                        <Button label="search" accent={true} onClick={noAction}/>
                    </Link>
                    
                </div>
         );
    }
}
 

function noAction (){

}

const styleSearch = {
    display: "flex",
  alignItems: "center",
}

const styleTexbox = {
    float: "left",
    width: "40%",
}
 
export default SearchTool;