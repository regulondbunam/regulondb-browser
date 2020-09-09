import React, {useState} from 'react';
import Texbox from '../../ui-components/basicInput/Text'
import Button from '../../ui-components/basicInput/Buttons';
import { useHistory } from 'react-router-dom';


const SearchTool = ({
    styleTexbox,
    styleButton,
    placeHolder = 'Example: “araC AND arabinose”, “araC transcriptional regulator”'
}) => {
    let history = useHistory();
    const [search, setSearch] = useState('')
    function Call(key){
        if(key === 'Enter'){
            history.push("/search/"+search)
        }
        
    }

    return (
        <div style={styleSearch} onKeyPress={(event) => {Call(event.key)}}>
                    <Texbox  style={styleTexbox} placeholder={placeHolder} onChange={(search)=>{setSearch(search)}}/>
                    <Button style={styleButton} label="search" accent={true} onClick={()=>{Call('Enter')}}/>          
        </div>
    );
}


const styleSearch = {
    display: "flex",
  alignItems: "center",
}
 
export default SearchTool;