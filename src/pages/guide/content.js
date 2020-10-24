import React, { useEffect, useState } from 'react';


const Content = (
    { url }
) => {
    const [htmlFile, sethtmlFile] = useState('<p>Loading...</p>')
    useEffect(() => {
        //console.log(url)
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = process;
        xhr.open("GET", url, true);
        xhr.send();
        xhr.onloadend = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 0) {
                    sethtmlFile(xhr.responseText)
                }
            }
        }
    })
    return <div dangerouslySetInnerHTML={{ __html: htmlFile }} />
}

export default Content;