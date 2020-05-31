import React, { Component } from 'react';
import Button /*{ IconButton }*/ from '../../basicInput/Buttons'
import TextBox from '../../basicInput/Text'
import Style from './SearchTool.module.css'

const TEXTBOX_style = {
    float: "left"
}

class SearchTool extends Component {
    state = {
        display: false,
        view: "default",
        keyword: ""
    }

    _inputChangedHandler = (text) => {
        this.setState({ keyword: text })
    }

    render() {
        return (
            <>
                <div className={Style.searchComponent}>
                    <TextBox
                        placeholder={"search"}
                        style={TEXTBOX_style}
                        onChangeText={(text) => this._inputChangedHandler(text)}
                         />
                    <Button label="search" accent={true} />
                </div>
            </>
        );
    }
}

export default SearchTool;