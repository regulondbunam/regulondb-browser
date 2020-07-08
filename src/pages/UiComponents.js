import React from 'react';

//import { DropDown } from './components/ui-components/basicInput/Buttons';

var page = require('./staticPages/images_context_help.html');

const UiComponents = () => {
    return (
        <div dangerouslySetInnerHTML={{__html: page}}>
        </div>
    );
}

export default UiComponents;