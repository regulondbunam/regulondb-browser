import React, { useEffect, useState } from 'react';
//import { DropDown } from './components/ui-components/basicInput/Buttons';

//const htmlFile = require('./guide/index.html')

const UiComponents = () => {

    const [htmlFile, sethtmlFile] = useState('<p>Loading...</p>')

    useEffect(()=>{

    })
    

    return (
        <div dangerouslySetInnerHTML={{ __html: htmlFile }}>
        </div>
    );
}

export default UiComponents;

/**
 * 
    useEffect(() => {
        console.log(urlFile)
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = process;
        xhr.open("GET", urlFile, true);
        xhr.send();
        xhr.onloadend = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 0) {
                    sethtmlFile(xhr.responseText)
                    console.log(xhr.responseText)
                }
            }
        }
    })
 */