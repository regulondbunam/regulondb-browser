import React, {Component} from 'react';
import Cover from '../Cover'
import Button from '../../basicInput/Buttons'

class ContentMenu extends Component {
    state = { selection: [] }
    render() {

        const {
            title,
            options,
            coverType,
            source
        } = this.props
        return (
            <>
            </>
        );
    }
}

ContentMenu.defaultProps = {
    options: ["Option A","Option B"]
}

export default ContentMenu;