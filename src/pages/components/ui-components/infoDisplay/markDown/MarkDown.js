import React, {Component} from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import Style from './Style.module.css'
//import './Style.css'




class PreviewMD extends Component {
    state = { markDown: "", mdpath: this.props.mdurl }

    componentDidMount(){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = process;
		xhr.open("GET", this.state.mdpath, true);
		xhr.send();
		xhr.onloadend = () => {
			this.setState({markDown: xhr.responseText})
			//console.log(xhr.responseText)
		}
		//this.setState({markDown: res})
    };

    render() { 

        const {
            markDown
        } = this.state

        return ( 
            <MarkdownPreview className={Style.md} source={markDown} />
         );
    }
}
 
export {PreviewMD}



