import React, { useEffect, useState } from 'react';
//import { DropDown } from './components/ui-components/basicInput/Buttons';
//./staticPages/images_context_help.html

const urlFile = './CellSensing.html'
//const urlFile = 'https://dl.dropboxusercontent.com/s/aomvy2ahn84tluz/RegulonDB%2010.7_%20Evidence%20Classification.html?dl=0'


const UiComponents = () => {
    const [htmlFile, sethtmlFile] = useState('<p>Loading...</p>')
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

    return (
        <div dangerouslySetInnerHTML={{ __html: htmlFile }}>
        </div>
    );
}

export default UiComponents;