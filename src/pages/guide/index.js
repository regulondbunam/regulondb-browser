import React, { useEffect, useState } from 'react';
import Content from './content'
import { withRouter } from 'react-router-dom';



const Guide = (
    { location }
) => {
    let url = ''
    let urlIndex = 'staticPages/guide/index.html'
    const urlContent = 'staticPages'
    const path = location.pathname
    const paths = path.split('/').length
    if (paths > 3) {
        //console.log(paths)
        url = '../'.repeat(paths - 1) + urlContent + path
        urlIndex = '../'.repeat(paths - 1)+urlIndex
    }else{
        urlIndex = '../'+urlIndex
    }
    const [index, setIndex] = useState('<p>Loading...</p>')

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
                            <h1 style={{ textAlign: 'center' }}>ReguolnDB Guides</h1>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{width: '20%'}}>
                            <div dangerouslySetInnerHTML={{ __html: index }} />
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