import React, { useEffect, useState } from 'react';

const GetFile = ({
    urlFile
}) => {
    const [htmlFile, sethtmlFile] = useState('<p>Loading...</p>')
    useEffect(() => {
        try {
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
        } catch (error) {
            
        }
        
    })

    return (
        <div dangerouslySetInnerHTML={{ __html: htmlFile }}>
        </div>
    );
}


export default  GetFile