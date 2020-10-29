import React, { useEffect, useState } from 'react';
import ReactMarkdown from "react-markdown";


const Content = (
    { url }
) => {
    const ext = url.split('.')
    const [markdown, setmarkdown] = useState('<p>Loading...</p>')
    useEffect(() => {
        //console.log(url)
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = process;
        xhr.open("GET", url, true);
        xhr.send();
        xhr.onloadend = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 0) {
                    setmarkdown(xhr.responseText)
                }
            }
        }
    })
    return (
        <>
        {
            ext[ext.length-1] === 'md'
            ?<ReactMarkdown allowDangerousHtml source={markdown} />
            :<div dangerouslySetInnerHTML={{__html: markdown}}  />
        }
        </>
    )
}

export default Content;