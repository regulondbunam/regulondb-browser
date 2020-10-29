import React, { useEffect, useState } from 'react';
import Content from './content'
import { withRouter } from 'react-router-dom';
import ReactMarkdown from "react-markdown";



const Guide = (
    { location }
) => {
    let url = ''
    let urlIndex = 'staticPages/guide/index.md'
    const urlContent = 'staticPages/guide/'
    const path = location.pathname
    const paths = path.split('/').length
    if (paths > 3) {
        //console.log(path)
        url = '../'.repeat(paths - 1) + urlContent + path
        urlIndex = '../'.repeat(paths - 1)+urlIndex
        console.log(url)
        console.log(urlIndex)
    }else{
        urlIndex = '../'+urlIndex
    }
    const [markdown, setIndex] = useState('<p>Loading...</p>')

    useEffect(() => {
        console.log(urlIndex)
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = process;
        xhr.open("GET", urlIndex, true);
        xhr.send();
        xhr.onloadend = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 0) {
                    setIndex(xhr.responseText)
                }
            }
        }
    })

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th colSpan="2">
                            <h1 style={{ textAlign: 'center' }}>RegulonDB Browser Guides</h1>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{width: '20%'}}>
                            <ReactMarkdown source={markdown} />
                        </td>
                        <td>
                            <Content url={url} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default withRouter(Guide);

/*
---
title: ""
--author: "RegulonDB Team"
--date: '02/07/2020'
output:
  html_document:
    fig_caption: yes
    highlight: zenburn
    includes:
    css: ./css/regulondbGlobalStyle.css
    self_contained: yes
---


*/